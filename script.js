const generateBtn = document.querySelector('#generateBtn');
const gridContainer = document.querySelector('#gridContainer');
const deleteBtn = document.querySelector('#deleteBtn');
const currentImgNum = document.querySelector('#currentImgNum');

generateBtn.addEventListener('click', () => {
    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;
    var maxNum = document.getElementById("maxNum").value;
    const rdNum = Math.floor(Math.random() * 1000) + 1; // 1 ~ 1000

    if (width.trim() === "") {
        width = 1600
    }
    if (height.trim() === "") {
        height = 900
    }
    if (maxNum.trim() === "") {
        maxNum = 10
    }

    if (gridContainer.children.length >= maxNum) {
        const confirmed = confirm('모두 지우기?');
        if (confirmed) {
            deleteImgs();
        }
        return;
    }

    const rdUrl = `https://picsum.photos/${width}/${height}?random=${rdNum}` // 백틱 써야 함
    const img = document.createElement('img');

    img.src = rdUrl // 랜덤 이미지 생성 링크
    gridContainer.appendChild(img);
    currentImgNum.textContent = gridContainer.children.length;

    // console.log(`w: ${width}, h: ${height}, number: ${rdNum}`);
    // alert(`w: ${width}, h: ${height}, number: ${rdNum}`);
    // Toast 메시지 표시
    showToast(`w: ${width}, h: ${height}, number: ${rdNum}`, "bg-info");
});

deleteBtn.addEventListener('click', deleteImgs);

function deleteImgs() {
    gridContainer.innerHTML = ""; // 모든 내용 삭제
    currentImgNum.textContent = 0;
}

function showToast(message, bgColor) {
    // Toast 컨테이너 생성
    var toastContainer = document.createElement("div");
    toastContainer.className = "toast align-items-center text-white " + bgColor;
    toastContainer.setAttribute("role", "alert");
    toastContainer.setAttribute("aria-live", "assertive");
    toastContainer.setAttribute("aria-atomic", "true");
    toastContainer.setAttribute("style", "position: fixed; top: 100px; right: 10px;");

    // Toast 내용 생성
    var toastContent = document.createElement("div");
    toastContent.className = "d-flex";
    var toastBody = document.createElement("div");
    toastBody.className = "toast-body";
    toastBody.innerText = message;
    var closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "btn-close me-2 m-auto";
    closeButton.setAttribute("data-bs-dismiss", "toast");
    closeButton.setAttribute("aria-label", "Close");

    // Toast 내용을 Toast 컨테이너에 추가
    toastContent.appendChild(toastBody);
    toastContent.appendChild(closeButton);
    toastContainer.appendChild(toastContent);

    // body에 Toast 컨테이너 추가
    document.body.appendChild(toastContainer);

    // Toast 표시
    var toast = new bootstrap.Toast(toastContainer);
    toast.show();

    // 일정 시간 후에 Toast 메시지 제거
    setTimeout(function() {
        document.body.removeChild(toastContainer);
    }, 2000); // 2초 후에 제거
}