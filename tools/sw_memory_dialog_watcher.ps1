Add-Type @'
using System;
using System.Text;
using System.Runtime.InteropServices;
public class MemDlgClick {
  [DllImport("user32.dll")] public static extern bool EnumWindows(EnumWindowsProc cb, IntPtr lp);
  [DllImport("user32.dll")] public static extern bool EnumChildWindows(IntPtr h, EnumWindowsProc cb, IntPtr lp);
  [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr h, out uint pid);
  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr h);
  [DllImport("user32.dll")] public static extern int GetWindowText(IntPtr h, StringBuilder sb, int n);
  [DllImport("user32.dll")] public static extern int GetClassName(IntPtr h, StringBuilder sb, int n);
  [DllImport("user32.dll")] public static extern IntPtr SendMessage(IntPtr h, uint msg, IntPtr wp, IntPtr lp);
  public delegate bool EnumWindowsProc(IntPtr h, IntPtr lp);
  public static IntPtr FindYesButton(uint targetPid) {
    IntPtr found = IntPtr.Zero;
    EnumWindows((h, lp) => {
      uint pid; GetWindowThreadProcessId(h, out pid);
      var c = new StringBuilder(256); GetClassName(h, c, 256);
      if (pid == targetPid && IsWindowVisible(h) && c.ToString() == "#32770") {
        EnumChildWindows(h, (ch, clp) => {
          var ct = new StringBuilder(256); GetWindowText(ch, ct, 256);
          var cc = new StringBuilder(256); GetClassName(ch, cc, 256);
          if (cc.ToString() == "Button" && ct.ToString().Contains("是")) { found = ch; }
          return true;
        }, IntPtr.Zero);
      }
      return true;
    }, IntPtr.Zero);
    return found;
  }
  public static IntPtr FindDialog(uint targetPid) {
    IntPtr found = IntPtr.Zero;
    EnumWindows((h, lp) => {
      uint pid; GetWindowThreadProcessId(h, out pid);
      var c = new StringBuilder(256); GetClassName(h, c, 256);
      if (pid == targetPid && IsWindowVisible(h) && c.ToString() == "#32770") { found = h; }
      return true;
    }, IntPtr.Zero);
    return found;
  }
}
'@
$deadline = (Get-Date).AddMinutes(150)
$clicks = 0
while ((Get-Date) -lt $deadline) {
  $swProc = Get-Process SLDWORKS -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($swProc) {
    $swPid = [uint32]$swProc.Id
    $dlg = [MemDlgClick]::FindDialog($swPid)
    if ($dlg -ne [IntPtr]::Zero) {
      $btn = [MemDlgClick]::FindYesButton($swPid)
      if ($btn -ne [IntPtr]::Zero) {
        [MemDlgClick]::SendMessage($btn, 0x00F5, [IntPtr]::Zero, [IntPtr]::Zero) | Out-Null  # BM_CLICK
        $clicks++
        Write-Host ("{0} clicked Yes #{1}" -f (Get-Date -Format 'HH:mm:ss'), $clicks)
      }
    }
  }
  Start-Sleep -Seconds 2
}
Write-Host "watcher done, total clicks: $clicks"
