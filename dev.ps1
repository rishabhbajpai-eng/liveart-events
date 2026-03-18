# Helper script to start the development server with correct PATH
$NodePath = "C:\Program Files\nodejs"
$GitPath = "C:\Program Files\Git\cmd"

Write-Host "Configuring environment..." -ForegroundColor Cyan

# Update current session PATH
if ($env:Path -notlike "*$NodePath*") {
    $env:Path = "$NodePath;$env:Path"
}
if ($env:Path -notlike "*$GitPath*") {
    $env:Path = "$GitPath;$env:Path"
}

# Verify tools
if (Get-Command node -ErrorAction SilentlyContinue) {
    Write-Host "Node.js found: $(node -v)" -ForegroundColor Green
} else {
    Write-Host "Error: Node.js not found at $NodePath" -ForegroundColor Red
    return
}

if (Get-Command npm -ErrorAction SilentlyContinue) {
    Write-Host "NPM found: $(npm -v)" -ForegroundColor Green
} else {
    Write-Host "Error: NPM not found" -ForegroundColor Red
    return
}

Write-Host "Starting development server..." -ForegroundColor Cyan
npm run dev
