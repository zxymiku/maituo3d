Add-Type @'
using System;
using System.Text;
using System.Collections.Generic;
using System.Runtime.InteropServices;
public class DlgRead {
  [DllImport("user32.dll")] public static extern bool EnumWindows(EnumWindowsProc cb, IntPtr lp);
  [DllImport("user32.dll")] public static extern bool EnumChildWindows(IntPtr h, EnumWindowsProc cb, IntPtr lp);
  [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr h, out uint pid);
  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr h);
  [DllImport("user32.dll")] public static extern int GetWindowText(IntPtr h, StringBuilder sb, int n);
  [DllImport("user32.dll")] public static extern int GetClassName(IntPtr h, StringBuilder sb, int n);
  public delegate bool EnumWindowsProc(IntPtr h, IntPtr lp);
  public static List<string> Lines;
  public static List<string> GetDialogText(uint targetPid) {
    Lines = new List<string>();
    EnumWindows((h, lp) => {
      uint pid; GetWindowThreadProcessId(h, out pid);
      var c = new StringBuilder(256); GetClassName(h, c, 256);
      if (pid == targetPid && IsWindowVisible(h) && c.ToString() == "#32770") {
        var t = new StringBuilder(256); GetWindowText(h, t, 256);
        Lines.Add("DIALOG: " + t.ToString());
        EnumChildWindows(h, (ch, clp) => {
          var ct = new StringBuilder(512); GetWindowText(ch, ct, 512);
          var cc = new StringBuilder(256); GetClassName(ch, cc, 256);
          if (ct.Length > 0) Lines.Add("  child[" + cc.ToString() + "]: " + ct.ToString());
          return true;
        }, IntPtr.Zero);
      }
      return true;
    }, IntPtr.Zero);
    return Lines;
  }
}
'@
[DlgRead]::GetDialogText((Get-Process SLDWORKS | Select-Object -First 1).Id) | ForEach-Object { $_ }
