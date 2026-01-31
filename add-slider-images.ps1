# Helper script to add slider images
# Place your 3 images in this folder, then run this script

$imagesFolder = "assets\images"
$requiredImages = @(
    "sample-prep-kits.jpg",
    "hplc-columns.jpg", 
    "deuterium-lamps.jpg"
)

Write-Host "=== Image Slider Setup ===" -ForegroundColor Cyan
Write-Host "`nLooking for image files in: $imagesFolder`n" -ForegroundColor Yellow

$missingImages = @()

foreach ($imageName in $requiredImages) {
    $imagePath = Join-Path $imagesFolder $imageName
    if (Test-Path $imagePath) {
        $size = (Get-Item $imagePath).Length / 1KB
        Write-Host "✓ Found: $imageName ($([math]::Round($size, 2)) KB)" -ForegroundColor Green
    } else {
        Write-Host "✗ Missing: $imageName" -ForegroundColor Red
        $missingImages += $imageName
    }
}

if ($missingImages.Count -eq 0) {
    Write-Host "`n✓ All images are ready! Refresh your browser to see the slider." -ForegroundColor Green
} else {
    Write-Host "`n⚠ Missing images:" -ForegroundColor Yellow
    foreach ($img in $missingImages) {
        Write-Host "  - $img" -ForegroundColor Yellow
    }
    Write-Host "`nTo add them:" -ForegroundColor Cyan
    Write-Host "1. Copy your image files to: $imagesFolder" -ForegroundColor White
    Write-Host "2. Rename them to match the names above" -ForegroundColor White
    Write-Host "3. Run this script again to verify" -ForegroundColor White
}

Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
