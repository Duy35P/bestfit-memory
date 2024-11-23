document.getElementById("nutGui").addEventListener("click", function () {
    const soKhoiNho = parseInt(document.getElementById("sokhoiNho").value);
    const soTienTrinh = parseInt(document.getElementById("sotienTrinh").value);

    if (soKhoiNho > 0 && soTienTrinh > 0) {
        const nhapLieuDiv = document.getElementById("nhapLieu");
        nhapLieuDiv.innerHTML = '';

        for (let i = 0; i < soKhoiNho; i++) {
            nhapLieuDiv.innerHTML += `<label for="khoiNho${i}">Kich thuoc khoi nho ${i + 1}:</label>
                                       <input type="number" id="khoiNho${i}" name="khoiNho${i}" min="1">`;
        }

        for (let i = 0; i < soTienTrinh; i++) {
            nhapLieuDiv.innerHTML += `<label for="tienTrinh${i}">Kich thuoc trinh ${i + 1}:</label>
                                       <input type="number" id="tienTrinh${i}" name="tienTrinh${i}" min="1">`;
        }

        nhapLieuDiv.innerHTML += `<button id="nutTinhToan">Tinh toan</button>`;

        document.getElementById("nutTinhToan").addEventListener("click", function () {
            xuLyTinhToan(soKhoiNho, soTienTrinh);
        });
    }
});

function xuLyTinhToan(soKhoiNho, soTienTrinh) {
    const khoiNho = [];
    const tienTrinh = [];

    for (let i = 0; i < soKhoiNho; i++) {
        khoiNho.push(parseInt(document.getElementById(`khoiNho${i}`).value));
    }

    for (let i = 0; i < soTienTrinh; i++) {
        tienTrinh.push(parseInt(document.getElementById(`tienTrinh${i}`).value));
    }

    const ketQua = xepKhopTotNhat(khoiNho, soKhoiNho, tienTrinh, soTienTrinh);
    hienThiKetQua(ketQua);
}

function xepKhopTotNhat(kichthuockhoi, m, kichthuoctientrinh, n) {
    const khoinho = new Array(n).fill(-1);
    const kichthuockhoigoc = [...kichthuockhoi];

    for (let i = 0; i < n; i++) {
        let khoitotnhat = -1;
        for (let j = 0; j < m; j++) {
            if (kichthuockhoi[j] >= kichthuoctientrinh[i]) {
                if (khoitotnhat === -1 || kichthuockhoi[khoitotnhat] > kichthuockhoi[j]) {
                    khoitotnhat = j;
                }
            }
        }
        if (khoitotnhat !== -1) {
            khoinho[i] = khoitotnhat;
            kichthuockhoi[khoitotnhat] -= kichthuoctientrinh[i];
        }
    }

    const results = [];
    for (let i = 0; i < n; i++) {
        results.push([
            i + 1,
            kichthuoctientrinh[i],
            khoinho[i] !== -1 ? khoinho[i] + 1 : "Chua duoc cap phat",
            khoinho[i] !== -1 ? kichthuockhoigoc[khoinho[i]] : "N/A",
            khoinho[i] !== -1 ? kichthuockhoi[khoinho[i]] : "N/A"
        ]);
    }
    return results;
}

function hienThiKetQua(ketQua) {
    const ketQuaDiv = document.getElementById("ketQua");
    ketQuaDiv.innerHTML = '<h2>ket qua Best Fit</h2>';
    ketQuaDiv.innerHTML += `<table>
                                <thead>
                                    <tr>
                                        <th>Tien trinh</th>
                                        <th>Kich thuoc tien trinh</th>
                                        <th>Khoi nho</th>
                                        <th>Kich thuoc khoi ban dau</th>
                                        <th>Kich thuoc khoi con lai</th>
                                    </tr>
                                </thead>
                                <tbody>
                                ${ketQua.map(row => `
                                    <tr>
                                        <td>${row[0]}</td>
                                        <td>${row[1]}</td>
                                        <td>${row[2]}</td>
                                        <td>${row[3]}</td>
                                        <td>${row[4]}</td>
                                    </tr>
                                `).join('')}
                                </tbody>
                            </table>`;
}
