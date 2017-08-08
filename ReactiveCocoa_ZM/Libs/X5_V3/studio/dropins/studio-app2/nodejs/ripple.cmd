@IF EXIST "xnode.exe" (
  "xnode.exe"  "node_modules\ripple-emulator\bin\ripple" %*
) ELSE (
  node  "node_modules\ripple-emulator\bin\ripple" %*
)