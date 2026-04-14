Add-Type -AssemblyName System.Drawing
$inputFile = "c:\Users\Rishabh\.gemini\antigravity\brain\d06ad7b1-b77f-444e-8570-0000bd2c04b5\media__1776205340817.jpg"
$outputFile = "c:\Users\Rishabh\Desktop\liveart\src\assets\logo.png"
$img = [System.Drawing.Image]::FromFile($inputFile)
$img.Save($outputFile, [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
