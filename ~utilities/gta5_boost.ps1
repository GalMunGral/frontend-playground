(Get-Process gta5).PriorityClass = 'High'
(Get-Process gtavlauncher).PriorityClass = 'Idle'
Get-Process subprocess | ForEach-Object {$_.PriorityClass = 'Idle'}