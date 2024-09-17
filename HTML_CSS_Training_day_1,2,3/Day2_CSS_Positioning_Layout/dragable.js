document.addEventListener('DOMContentLoaded', () => {
    const dragBox = document.querySelector('.dragBox');
    const dragInfo = document.querySelector('.dragInfo');
    const mainBox = document.querySelector('.mainBox');
    let offsetX, offsetY;
    let isDraggingBox = false;
    let isDraggingInfo = false;

    function onMouseDown(e, isDraggingFlag) {
        if (isDraggingFlag === 'box') {
            isDraggingBox = true;
        } else if (isDraggingFlag === 'info') {
            isDraggingInfo = true;
        }
        offsetX = e.clientX - e.target.getBoundingClientRect().left;
        offsetY = e.clientY - e.target.getBoundingClientRect().top;
        e.target.style.cursor = 'grabbing';
    }

    function onMouseMove(e) {
        if (isDraggingBox) {
            const boxRect = mainBox.getBoundingClientRect();
            let newLeft = e.clientX - offsetX - boxRect.left;
            let newTop = e.clientY - offsetY - boxRect.top;

            newLeft = Math.max(0, Math.min(newLeft, mainBox.clientWidth - dragBox.clientWidth));
            newTop = Math.max(0, Math.min(newTop, mainBox.clientHeight - dragBox.clientHeight));

            dragBox.style.left = `${newLeft}px`;
            dragBox.style.top = `${newTop}px`;
        }

        if (isDraggingInfo) {
          
            const newLeft = e.clientX - offsetX;
            const newTop = e.clientY - offsetY;

            dragInfo.style.left = `${newLeft}px`;
            dragInfo.style.top = `${newTop}px`;
        }
    }

    function onMouseUp(e) {
    
        if (isDraggingBox) {
            isDraggingBox = false;
            dragBox.style.cursor = 'move';
        }

        if (isDraggingInfo) {
            isDraggingInfo = false;
            dragInfo.style.cursor = 'move';
        }
    }

    dragBox.addEventListener('mousedown', (e) => onMouseDown(e, 'box'));
    dragInfo.addEventListener('mousedown', (e) => onMouseDown(e, 'info'));

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});
