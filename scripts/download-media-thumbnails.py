from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "tmp" / "media-audit"
OUT.mkdir(parents=True, exist_ok=True)

FILES = {
    "hero": [
        ("DSC03793", "1Q2Q-koKMrm3_faNW6r4XDFjEaffZ3dIa"), ("DSC03822", "1yKCbR3VO49PM5EKuonol93wX6c1o6t0L"),
        ("phone-photo", "1gxmvqibInXO8FSuk175Av1BHA0Naj-vw"), ("DSC03513", "1YqzMH4cPRCGrEg41DxLCqlasROs3lrYp"),
        ("DSC03515", "1W9NEVXgkMHfRf6rCoNvEMe4iXHon0kKj"), ("DSC03505", "1AQJPZMyEAd2sAEbAG_GGaQfCZlAbRG60"),
        ("DSC03329", "1sioSPw4gg8lj8zvxRGHRly4C8GSL1rmB"), ("DSC03211", "1aWfQrmqgOMZz6Hi5-QxKBEmqWNqA6ZbO"),
        ("DSC01590", "1xJ8i4hwEj0nReJmnapweiRgccx92NGi-"),
    ],
    "pre": [
        ("DSC03329", "1skem_Ov75oxzFprDO-A8y1gBjSfWQkDu"), ("DSC03050", "1ZMEZMYBKrHJ736tF-CNX5_psH9E49yHw"),
        ("DSC02978", "1_QJfOzo85HxEEcYs5VLC804bxLTQddPu"), ("DSC03211", "1tPwp9jzTl3MCDCQKh_glbyPy64OJwR8b"),
        ("DSC03187", "1C2jhpma3wgGNEObo255Mdl2-AKQ7gsCA"), ("DSC02948", "1T4N-r4hXMs04_xnLt32vBMsf8-WpalrP"),
        ("DSC03018", "1ds7jJ5pEn64kQGLfwW69kg6ZXXIVZmu0"), ("DSC01882", "1zRRh9QKyrrGi0GskjvfQ-HLbHv66lqBo"),
        ("DSC02356", "1PdKYoMAAH0po1QjpZJX6ZmT6oDdEAq1-"), ("DSC01928", "13niw_zcWW5rQgBio66KiwUn-9j3Sm57l"),
    ],
    "ci3m": [
        ("DSC03415", "1rczqPk55K-wm4BVjQcrObH8Ld5eOko2N"), ("DSC03441", "177n8OwnrsGFCGWPX_SukmEyjPDfzQfc2"),
        ("DSC03421", "11oogFqG4yElL_da7I_99OrfiXX-4DWgi"), ("DSC03439", "1uzz0i5JApHlbzRIH2nXDm91H3X2JB8i7"),
        ("DSC03478", "1AFMkPgphTuZSfk-NVMZk0PxiBQKAnhEF"), ("DSC03474", "1nGd5T0c_d5UERQtJh5eo_dJawdYFSgwX"),
        ("DSC03467", "15XI_azt5QYQw6-awFO8ZAXggBEJ7tVUM"), ("DSC03459", "1pZ_KY-d5b1XT0sjQSWtRWDAhJ9Hborem"),
        ("DSC03175", "1laR4U4_d6zIKXv09R-oYg0TrQTJrXhxy"), ("DSC03201", "1eDoSoL-NpEMIps2CSINye5sORn37ACXD"),
        ("DSC02733", "1EhVOV6lp6UvSVqDxSE0Ay9v0uJGvZfsE"), ("DSC02140", "1ud9tZwNF45MdI0knDF35JQOT7QU77Itv"),
        ("DSC02460", "12wE7rFn9oXMf3F60O8uDMu9i-32QYihf"), ("DSC02272", "1iVOr6PQP6QGxxFVg8dTOKfSGPbRdH6eR"),
        ("DSC01916", "1L5F-reaOjo80LdcOnUfVKGBdvDY2rLqr"), ("DSC01926", "1Bj3FhibsdIWd0r8w5nSoyNQqPIS5Sybs"),
        ("DSC01835", "13T_rs1P1bbLkMD4AgsL4uKkcF1AXP8uT"), ("DSC01811", "1amhYigXVYrWA-yPM_anwaJt4Q1h85BJZ"),
        ("DSC02187", "1_OXFUmuzo40Og1dP4fF5tRQ4ZMX3fTJp"), ("DSC01768", "1qxMxG2LSbhs6Jr_KV_s_Z-DgQMzwwgYV"),
    ],
    "inovasi": [
        ("DSC03127", "1JspXaqL8QopTD9BaBvkwS7Jp1qyKWuuq"), ("DSC03128", "1wSQqu6CMLY3TFseyVT-PpcuiKwHqV0iK"),
        ("DSC02974", "1gFiaq9RIX1qNVpT-RsWXZlAGEvOVTXEe"), ("DSC01529", "1BAX51pgehp6hUwtwr8fDw20JznrJBdJh"),
        ("DSC03078", "1B6Ae84H5FP71TkI4Vtsp7SPwKyYFWsB3"), ("DSC03110", "1_TbZMUOLD8vUd3esBtEImY8s5cC9DMT9"),
        ("DSC03115", "1NjEE2NHnY1opQJM8Lm-aNuW7_t4Bk9KZ"), ("DSC03169", "1O6b1zHEf4ysI4enqoMKrAod88pCTbmnP"),
        ("DSC03117", "1Qv9bc7bcUNN3ATv9wp8ps0CRxBIoMC31"), ("DSC03133", "1E3bn7eP4WpzHeZlFT0Zj8mjHnWBDl4xZ"),
    ],
    "pblstem": [
        ("DSC03787", "1BFgEo9g84KBqTL-D5VSmF_55CyhyxbCi"), ("DSC02464", "1WjM3UzSxW5u5rz349fQcZLbt0j4kyPua"),
        ("DSC04071", "1QRkn5sJCci9V6AOhy6nHRSsYpHgSVbty"), ("DSC04031", "10uNXVnnP7yo8JtL6sqIU6TN9BWHa9pgn"),
        ("DSC04021", "1HZpMQVl-HeflQoJ8E8Q80gR7BU40QUKO"), ("DSC04013", "1zwgmsUddqJI5v9NExUgFzBTLgETpfUU6"),
        ("DSC04009", "1XXn-AMNRjaQ8sRlkpzijIq0lyLdc_wvJ"),
    ],
    "pbl": [("DSC03791", "1S29ny5Zm7xHFdmPnm1NqnOeAMp32YD6h")],
    "kmr": [("DSC05733", "1V7nBwcKt9KEzuhVZtfsde2LpnbpbQa3g")],
    "kajian": [
        ("DSC05956", "123heRLmd7ik_-SEL4wQBRPc467-Sfzvm"), ("DSC05976", "17XVA15Wi4_-nR1krQuCaBBoqk-xTmLjx"),
        ("DSC05973", "1sMh13r_8BATWQIwc-VPIp2crGGNHk5Av"), ("DSC05949", "1Lz_v_e7FJPU2n88ig0-0is2At_fZwtEO"),
    ],
    "kemuncak": [
        ("DSC03882", "1w3goQ3gOF_v9OjADygoVjXjpATSI7KxL"), ("DSC04192", "1NmlTsY8N12GBnBHOHV5mL-PP3RxzbHyV"),
        ("DSC05742", "1c4sjF_gDc3IBlVsk7bVxFzpZQzSp7I8g"), ("DSC02475", "1dXkMLO_hrcM_ubQp5e3t9C-ItJCHrYtN"),
        ("DSC02526", "1ZlRm3FxaOQ7ZXTvxFwewWjeUE0wHDOVp"),
    ],
    "lokasi": [("DSC06457", "1TPsHhiTRcpdZqmiDE-uZ10YB8AeK_XeI"), ("DSC06456", "1BG2M7-1EsCLTnlnrZClg9-uVvwUJV4ue")],
    "keputusan": [
        ("DSC06505", "11f5EDbBu8vFF_fSjEs3truNrnuQcI4Rr"), ("DSC03934", "1ngLJAZ070ZNeJFhQpI_WrD9j-47JYVS8"),
        ("DSC06499", "1EkuhUxAveihqHY593Cpj3ppg8TYGbN1u"),
    ],
    "tentang": [
        ("IMG4235", "1pRB6Yh1WVdxn_O6T7aUpsAM5AjEF6t1M"), ("DSC03081", "1qmMHVyHCTeXa-2mquB6eVeyyX4tfi_vl"),
        ("DSC02236", "1jmjCDBy4PL1ew_c0qzGShZR-vP1E6cyU"), ("DSC01942", "1qoXlbZvS7DVRbmACkw_Fme8WCIIEzJzF"),
    ],
}

def download(entry):
    group, name, file_id = entry
    path = OUT / f"{group}_{name}.jpg"
    if path.exists() and path.stat().st_size > 1000:
        return path.name, path.stat().st_size
    url = f"https://drive.google.com/thumbnail?id={file_id}&sz=w1200"
    data = urlopen(url, timeout=45).read()
    path.write_bytes(data)
    return path.name, len(data)

entries = [(group, name, file_id) for group, items in FILES.items() for name, file_id in items]
with ThreadPoolExecutor(max_workers=8) as pool:
    futures = [pool.submit(download, entry) for entry in entries]
    for future in as_completed(futures):
        name, size = future.result()
        print(f"{name}\t{size}")

print(f"Downloaded {len(entries)} thumbnails to {OUT}")
