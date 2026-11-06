#!/usr/bin/env python3
"""Pure-Python 3D mesh generator for simplified solar car parts (zero external dependencies)."""

from __future__ import annotations
import math
from typing import Dict, List, Sequence, Tuple

Point2D = Tuple[float, float]
Point3D = Tuple[float, float, float]


def signed_area_2d(poly: Sequence[Point2D]) -> float:
    n = len(poly)
    if n < 3:
        return 0.0
    area = 0.0
    for i in range(n):
        x1, y1 = poly[i]
        x2, y2 = poly[(i + 1) % n]
        area += x1 * y2 - x2 * y1
    return 0.5 * area


def ensure_ccw(poly: Sequence[Point2D]) -> List[Point2D]:
    pts = list(poly)
    if len(pts) > 1 and math.hypot(pts[0][0] - pts[-1][0], pts[0][1] - pts[-1][1]) < 1e-7:
        pts.pop()
    if signed_area_2d(pts) < 0:
        pts.reverse()
    return pts


def ensure_cw(poly: Sequence[Point2D]) -> List[Point2D]:
    pts = list(poly)
    if len(pts) > 1 and math.hypot(pts[0][0] - pts[-1][0], pts[0][1] - pts[-1][1]) < 1e-7:
        pts.pop()
    if signed_area_2d(pts) > 0:
        pts.reverse()
    return pts


def cross_2d(a: Point2D, b: Point2D, c: Point2D) -> float:
    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])


def point_in_triangle_2d(p: Point2D, a: Point2D, b: Point2D, c: Point2D) -> bool:
    c1 = cross_2d(a, b, p)
    c2 = cross_2d(b, c, p)
    c3 = cross_2d(c, a, p)
    eps = -1e-9
    return c1 >= eps and c2 >= eps and c3 >= eps


def segments_intersect(p1: Point2D, p2: Point2D, q1: Point2D, q2: Point2D) -> bool:
    def ccw(a: Point2D, b: Point2D, c: Point2D) -> float:
        return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])

    d1 = ccw(p1, p2, q1)
    d2 = ccw(p1, p2, q2)
    d3 = ccw(q1, q2, p1)
    d4 = ccw(q1, q2, p2)
    if ((d1 > 1e-9 and d2 < -1e-9) or (d1 < -1e-9 and d2 > 1e-9)) and (
        (d3 > 1e-9 and d4 < -1e-9) or (d3 < -1e-9 and d4 > 1e-9)
    ):
        return True
    return False


def merge_holes_into_outer(outer: Sequence[Point2D], holes: Sequence[Sequence[Point2D]]) -> List[Point2D]:
    poly = ensure_ccw(outer)
    if not holes:
        return poly

    sorted_holes = [ensure_cw(h) for h in holes if len(h) >= 3]
    sorted_holes.sort(key=lambda h: max(pt[0] for pt in h), reverse=True)

    for hole in sorted_holes:
        # Find rightmost vertex in hole
        m_idx = max(range(len(hole)), key=lambda i: (hole[i][0], hole[i][1]))
        hx, hy = hole[m_idx]

        # Find visible vertex on outer polygon to bridge
        best_o_idx = 0
        best_dist = float("inf")
        n_poly = len(poly)
        for i, (ox, oy) in enumerate(poly):
            if ox < hx - 1e-6:
                continue
            dist = math.hypot(ox - hx, oy - hy)
            # Check segment visibility against poly edges
            intersects = False
            for j in range(n_poly):
                j_next = (j + 1) % n_poly
                if j == i or j_next == i:
                    continue
                if segments_intersect((hx, hy), (ox, oy), poly[j], poly[j_next]):
                    intersects = True
                    break
            if not intersects and dist < best_dist:
                best_dist = dist
                best_o_idx = i

        if best_dist == float("inf"):
            # Fallback: nearest vertex on poly
            best_o_idx = min(
                range(len(poly)),
                key=lambda i: math.hypot(poly[i][0] - hx, poly[i][1] - hy),
            )

        reordered_hole = [hole[(m_idx + k) % len(hole)] for k in range(len(hole))]
        poly = (
            poly[: best_o_idx + 1]
            + reordered_hole
            + [reordered_hole[0], poly[best_o_idx]]
            + poly[best_o_idx + 1 :]
        )
    return poly


def triangulate_simple_polygon(poly: Sequence[Point2D]) -> List[Tuple[Point2D, Point2D, Point2D]]:
    pts = list(poly)
    tris: List[Tuple[Point2D, Point2D, Point2D]] = []
    if len(pts) < 3:
        return tris

    max_iters = len(pts) * 4 + 20
    it = 0
    while len(pts) > 3 and it < max_iters:
        it += 1
        n = len(pts)
        ear_found = False
        for i in range(n):
            prev_p = pts[(i - 1) % n]
            curr_p = pts[i]
            next_p = pts[(i + 1) % n]
            if cross_2d(prev_p, curr_p, next_p) <= 1e-8:
                continue
            has_inside = False
            for j in range(n):
                if j in ((i - 1) % n, i, (i + 1) % n):
                    continue
                p = pts[j]
                if (
                    math.hypot(p[0] - prev_p[0], p[1] - prev_p[1]) < 1e-6
                    or math.hypot(p[0] - curr_p[0], p[1] - curr_p[1]) < 1e-6
                    or math.hypot(p[0] - next_p[0], p[1] - next_p[1]) < 1e-6
                ):
                    continue
                if point_in_triangle_2d(p, prev_p, curr_p, next_p):
                    has_inside = True
                    break
            if not has_inside:
                tris.append((prev_p, curr_p, next_p))
                pts.pop(i)
                ear_found = True
                break
        if not ear_found:
            # Relaxed fallback if degenerate bridge vertices occur
            best_i = max(
                range(n),
                key=lambda idx: cross_2d(pts[(idx - 1) % n], pts[idx], pts[(idx + 1) % n]),
            )
            prev_p = pts[(best_i - 1) % n]
            curr_p = pts[best_i]
            next_p = pts[(best_i + 1) % n]
            if abs(cross_2d(prev_p, curr_p, next_p)) > 1e-9:
                tris.append((prev_p, curr_p, next_p))
            pts.pop(best_i)

    if len(pts) == 3 and abs(cross_2d(pts[0], pts[1], pts[2])) > 1e-9:
        tris.append((pts[0], pts[1], pts[2]))
    return tris


def make_circle_loop(cx: float, cy: float, r: float, segments: int = 28) -> List[Point2D]:
    return [
        (
            cx + r * math.cos(2.0 * math.pi * i / segments),
            cy + r * math.sin(2.0 * math.pi * i / segments),
        )
        for i in range(segments)
    ]


def make_rect_loop(cx: float, cy: float, w: float, h: float, fillet: float = 0.0) -> List[Point2D]:
    hw, hh = 0.5 * w, 0.5 * h
    r = min(max(0.0, fillet), hw * 0.45, hh * 0.45)
    if r <= 1e-6:
        return [
            (cx - hw, cy - hh),
            (cx + hw, cy - hh),
            (cx + hw, cy + hh),
            (cx - hw, cy + hh),
        ]
    pts: List[Point2D] = []
    corners = [
        (cx + hw - r, cy + hh - r, 0.0, 0.5 * math.pi),
        (cx - hw + r, cy + hh - r, 0.5 * math.pi, math.pi),
        (cx - hw + r, cy - hh + r, math.pi, 1.5 * math.pi),
        (cx + hw - r, cy - hh + r, 1.5 * math.pi, 2.0 * math.pi),
    ]
    steps = 5
    for ox, oy, a0, a1 in corners:
        for k in range(steps + 1):
            a = a0 + (a1 - a0) * (k / steps)
            pts.append((ox + r * math.cos(a), oy + r * math.sin(a)))
    return pts


def make_gear_loop(
    module_mm: float,
    teeth: int,
    pressure_angle_deg: float = 20.0,
) -> List[Point2D]:
    pitch_r = 0.5 * module_mm * teeth
    addendum_r = pitch_r + module_mm
    dedendum_r = max(0.8, pitch_r - 1.25 * module_mm)
    pitch_angle = 2.0 * math.pi / teeth
    half_tooth = pitch_angle * 0.24
    tip_half = half_tooth * 0.68
    root_half = half_tooth * 1.22
    pts: List[Point2D] = []
    for i in range(teeth):
        center_a = i * pitch_angle
        angles_radii = [
            (center_a - 0.5 * pitch_angle, dedendum_r),
            (center_a - root_half, dedendum_r),
            (center_a - half_tooth, pitch_r),
            (center_a - tip_half, addendum_r),
            (center_a + tip_half, addendum_r),
            (center_a + half_tooth, pitch_r),
            (center_a + root_half, dedendum_r),
        ]
        for a, r in angles_radii:
            pts.append((r * math.cos(a), r * math.sin(a)))
    return pts


def cam_displacement_5th(theta_rad: float, stroke_mm: float = 3.8) -> float:
    """5th-degree polynomial symmetric cam profile for S-curve / straight-line correction:
    0..60 deg: dwell at 0
    60..150 deg: rise 0 -> +stroke_mm
    150..210 deg: fall +stroke_mm -> -stroke_mm
    210..300 deg: rise -stroke_mm -> 0
    300..360 deg: dwell at 0
    """
    deg = math.degrees(theta_rad) % 360.0

    def poly5(u: float) -> float:
        u = max(0.0, min(1.0, u))
        return u * u * u * (10.0 - 15.0 * u + 6.0 * u * u)

    if deg < 60.0:
        return 0.0
    if deg < 150.0:
        u = (deg - 60.0) / 90.0
        return stroke_mm * poly5(u)
    if deg < 210.0:
        u = (deg - 150.0) / 60.0
        return stroke_mm * (1.0 - 2.0 * poly5(u))
    if deg < 300.0:
        u = (deg - 210.0) / 90.0
        return -stroke_mm * (1.0 - poly5(u))
    return 0.0


def make_cam_loop(base_r: float = 16.0, stroke_mm: float = 3.8, samples: int = 96) -> List[Point2D]:
    pts: List[Point2D] = []
    for i in range(samples):
        theta = 2.0 * math.pi * i / samples
        r = base_r + cam_displacement_5th(theta, stroke_mm)
        pts.append((r * math.cos(theta), r * math.sin(theta)))
    return pts


def map_plane_to_3d(plane: str, u: float, v: float, w: float) -> Point3D:
    if plane == "XY":
        return (u, v, w)
    if plane == "XZ":
        return (u, w, v)
    if plane == "YZ":
        return (w, u, v)
    return (u, v, w)


class MeshAccumulator:
    """Accumulates indexed triangles and flat-shaded vertex normals for Three.js."""

    def __init__(self) -> None:
        self.positions: List[float] = []
        self.normals: List[float] = []
        self.indices: List[int] = []

    def add_triangle(self, p0: Point3D, p1: Point3D, p2: Point3D) -> None:
        ux, uy, uz = p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]
        vx, vy, vz = p2[0] - p0[0], p2[1] - p0[1], p2[2] - p0[2]
        nx = uy * vz - uz * vy
        ny = uz * vx - ux * vz
        nz = ux * vy - uy * vx
        length = math.sqrt(nx * nx + ny * ny + nz * nz)
        if length <= 1e-10:
            return
        nx, ny, nz = nx / length, ny / length, nz / length
        base_idx = len(self.positions) // 3
        for p in (p0, p1, p2):
            self.positions.extend([round(p[0], 3), round(p[1], 3), round(p[2], 3)])
            self.normals.extend([round(nx, 4), round(ny, 4), round(nz, 4)])
        self.indices.extend([base_idx, base_idx + 1, base_idx + 2])

    def add_extruded_polygon(
        self,
        plane: str,
        outer: Sequence[Point2D],
        holes: Sequence[Sequence[Point2D]],
        w0: float,
        w1: float,
    ) -> None:
        w_min, w_max = (w0, w1) if w0 <= w1 else (w1, w0)
        outer_ccw = ensure_ccw(outer)
        holes_cw = [ensure_cw(h) for h in holes if len(h) >= 3]
        merged = merge_holes_into_outer(outer_ccw, holes_cw)
        tris_2d = triangulate_simple_polygon(merged)

        # XZ plane swaps handedness when mapping (u, w, v), so adjust winding
        flip = plane == "XZ"

        for a, b, c in tris_2d:
            t0 = map_plane_to_3d(plane, a[0], a[1], w_max)
            t1 = map_plane_to_3d(plane, b[0], b[1], w_max)
            t2 = map_plane_to_3d(plane, c[0], c[1], w_max)
            b0 = map_plane_to_3d(plane, a[0], a[1], w_min)
            b1 = map_plane_to_3d(plane, b[0], b[1], w_min)
            b2 = map_plane_to_3d(plane, c[0], c[1], w_min)
            if not flip:
                self.add_triangle(t0, t1, t2)
                self.add_triangle(b0, b2, b1)
            else:
                self.add_triangle(t0, t2, t1)
                self.add_triangle(b0, b1, b2)

        all_loops = [outer_ccw] + holes_cw
        for loop in all_loops:
            n = len(loop)
            for i in range(n):
                u0, v0 = loop[i]
                u1, v1 = loop[(i + 1) % n]
                p00 = map_plane_to_3d(plane, u0, v0, w_min)
                p10 = map_plane_to_3d(plane, u1, v1, w_min)
                p11 = map_plane_to_3d(plane, u1, v1, w_max)
                p01 = map_plane_to_3d(plane, u0, v0, w_max)
                if not flip:
                    self.add_triangle(p00, p10, p11)
                    self.add_triangle(p00, p11, p01)
                else:
                    self.add_triangle(p00, p11, p10)
                    self.add_triangle(p00, p01, p11)

    def to_dict(self) -> Dict[str, object]:
        if not self.positions:
            return {
                "vertexCount": 0,
                "triangleCount": 0,
                "bbox": {"min": [0, 0, 0], "max": [0, 0, 0], "size": [0, 0, 0]},
                "positions": [],
                "normals": [],
                "indices": [],
            }
        xs = self.positions[0::3]
        ys = self.positions[1::3]
        zs = self.positions[2::3]
        min_pt = [round(min(xs), 2), round(min(ys), 2), round(min(zs), 2)]
        max_pt = [round(max(xs), 2), round(max(ys), 2), round(max(zs), 2)]
        size_pt = [
            round(max_pt[0] - min_pt[0], 2),
            round(max_pt[1] - min_pt[1], 2),
            round(max_pt[2] - min_pt[2], 2),
        ]
        return {
            "vertexCount": len(self.positions) // 3,
            "triangleCount": len(self.indices) // 3,
            "bbox": {"min": min_pt, "max": max_pt, "size": size_pt},
            "positions": self.positions,
            "normals": self.normals,
            "indices": self.indices,
        }
