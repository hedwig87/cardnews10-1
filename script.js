let currentCard = 0;
const cards = document.querySelectorAll('.news-card');
const indicators = document.querySelectorAll('.indicator');
const totalCards = cards.length;

// 자동 슬라이드 기능
let autoSlideInterval;
const autoSlideDelay = 5000; // 5초

function showCard(index) {
    // 모든 카드 숨기기
    cards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            setTimeout(() => {
                card.classList.add('active');
            }, 100);
        }
    });
    
    // 인디케이터 업데이트
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
    
    currentCard = index;
}

function nextCard() {
    const nextIndex = (currentCard + 1) % totalCards;
    showCard(nextIndex);
    resetAutoSlide();
}

function previousCard() {
    const prevIndex = (currentCard - 1 + totalCards) % totalCards;
    showCard(prevIndex);
    resetAutoSlide();
}

function goToCard(index) {
    showCard(index);
    resetAutoSlide();
}

// 자동 슬라이드 시작
function startAutoSlide() {
    // autoSlideInterval = setInterval(nextCard, autoSlideDelay);
}

// 자동 슬라이드 정지 및 재시작
function resetAutoSlide() {
    // clearInterval(autoSlideInterval);
    // startAutoSlide();
}

// 키보드 네비게이션
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextCard();
    } else if (e.key === 'ArrowLeft') {
        previousCard();
    } else if (e.key >= '1' && e.key <= '6') {
        const cardIndex = parseInt(e.key) - 1;
        if (cardIndex < totalCards) {
            goToCard(cardIndex);
        }
    }
});

// 터치 스와이프 지원
let startX = 0;
let endX = 0;

document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = startX - endX;
    const minSwipeDistance = 50;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
            // 왼쪽으로 스와이프 (다음 카드)
            nextCard();
        } else {
            // 오른쪽으로 스와이프 (이전 카드)
            previousCard();
        }
    }
}

// 마우스 호버 시 자동 슬라이드 일시 정지
const cardContainer = document.querySelector('.card-container');

cardContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

cardContainer.addEventListener('mouseleave', () => {
    startAutoSlide();
});

// 페이지 로드 시 자동 슬라이드 시작
document.addEventListener('DOMContentLoaded', () => {
    // startAutoSlide();
});

// 페이지 가시성 변경 시 자동 슬라이드 제어
document.addEventListener('visibilitychange', () => {
    // if (document.hidden) {
    //     clearInterval(autoSlideInterval);
    // } else {
    //     startAutoSlide();
    // }
});

// 카드 클릭 시 상세 정보 토글 (추가 기능)
cards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
        // 네비게이션 버튼 클릭이 아닌 경우에만 실행
        if (!e.target.classList.contains('nav-btn') && !e.target.classList.contains('indicator')) {
            card.classList.toggle('expanded');
        }
    });
});

// 진행 바 표시 (선택사항)
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    
    const navigation = document.querySelector('.navigation');
    navigation.insertBefore(progressBar, navigation.firstChild);
    
    return progressBar;
}

// 진행 바 업데이트
function updateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const progress = ((currentCard + 1) / totalCards) * 100;
        progressFill.style.width = progress + '%';
    }
}

// 진행 바 생성 및 초기화
document.addEventListener('DOMContentLoaded', () => {
    createProgressBar();
    updateProgressBar();
});

// 카드 변경 시 진행 바 업데이트
const originalShowCard = showCard;
showCard = function(index) {
    originalShowCard(index);
    updateProgressBar();
};

// 에러 핸들링
window.addEventListener('error', (e) => {
    console.error('카드뉴스 오류:', e.error);
});

// 성능 최적화를 위한 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 리사이즈 이벤트 최적화
const handleResize = debounce(() => {
    // 필요한 경우 레이아웃 재계산
    console.log('화면 크기 변경됨');
}, 250);

window.addEventListener('resize', handleResize);
