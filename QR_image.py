import qrcode

url = input("Enter the portfolio url: ").strip()
if not url:
    raise ValueError("URL cannot be empty")

file_path = r"C:\Users\KSHITIZ\OneDrive\Desktop\25f1001872.github.io\scan_me.png"

qr = qrcode.QRCode()
qr.add_data(url)

image = qr.make_image()
image.save(file_path)

print("QR code was genrated!")
# https://25f1001872.github.io/