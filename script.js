const generateBtn = document.querySelector('#generateBtn'); // [새 이미지!]
const gridContainer = document.querySelector('#gridContainer'); // 이미지 생성되는 곳
const tooltipContainer = document.querySelector('#tooltipContainer'); // 툴팁 div
const tooltipText = tooltipContainer.innerHTML; // 툴팁 HTML 텍스트
const deleteBtn = document.querySelector('#deleteBtn'); // [지우기]
const currentImgNum = document.querySelector('#currentImgNum'); // 현재 이미지 수

generateBtn.addEventListener('click', addImgs); // 이미지 추가
deleteBtn.addEventListener('click', () => { // 이미지 삭제
    gridContainer.innerHTML = ""; // 모든 내용 삭제
    currentImgNum.textContent = 0; // 현재 이미지 수 업데이트
    tooltipContainer.innerHTML = tooltipText; // 툴팁 보여주기
});

function addImgs() {
    var width = document.getElementById("width").value; // 가로 크기
    var height = document.getElementById("height").value; // 세로 크기
    var maxNum = document.getElementById("maxNum").value; // 최대 이미지 수
    const rdNum = Math.floor(Math.random() * 10000) + 1; // 1 ~ 10000 랜덤 이미지 번호

    if (width.trim() === "") { // 가로 크기 기본값
        width = 1600;
    }
    if (height.trim() === "") { // 세로 크기 기본값
        height = 900;
    }
    if (maxNum.trim() === "") { // 최대 이미지 수 기본값
        maxNum = 10;
    }

    if (gridContainer.children.length == 0) { // 이미지 처음 생성시 툴팁 삭제
        tooltipContainer.innerHTML = "";
    }

    if (gridContainer.children.length >= maxNum) { // 최대 이미지 수 도달시 생성하지 않고 경고
        const confirmed = confirm('모두 지우기?');
        if (confirmed) {
            deleteImgs();
        }
        return;
    }

    const rdUrl = `https://picsum.photos/${width}/${height}?random=${rdNum}`; // 백틱 써야 함
    const img = document.createElement('img');

    img.src = rdUrl // 랜덤 이미지 생성 링크
    gridContainer.appendChild(img); // 화면에 이미지 추가
    currentImgNum.textContent = gridContainer.children.length; // 현재 이미지 수 입력

    // console.log(`w: ${width}, h: ${height}, number: ${rdNum}`);
    // alert(`w: ${width}, h: ${height}, number: ${rdNum}`);
    showToast(`w: ${width}, h: ${height}, number: ${rdNum}`, "bg-info"); // Toast 메시지 표시
};

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