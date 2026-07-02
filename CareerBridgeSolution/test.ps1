$body = @{ email = 'atharvapawar25@gmail.com'; password = 'Password123!' } | ConvertTo-Json
try { 
    $res = Invoke-RestMethod -Uri 'http://localhost:5097/api/Auth/login' -Method Post -Body $body -ContentType 'application/json'
    $token = $res.token
    $headers = @{ Authorization = "Bearer $token" }
    $res2 = Invoke-RestMethod -Uri 'http://localhost:5097/api/Dashboard' -Headers $headers
    $res2 | ConvertTo-Json -Depth 10 
} catch { 
    $_.Exception.Response | % { $_.GetResponseStream() } | % { (New-Object System.IO.StreamReader($_)).ReadToEnd() } 
}
