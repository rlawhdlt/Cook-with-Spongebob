document.addEventListener('DOMContentLoaded', function() {
    const section1 = document.getElementById('section1');
    const section2 = document.getElementById('section2');
    const section3 = document.getElementById('section3');
    const container = document.querySelector('.horizontal-scroll-container');
    const storyTexts = document.querySelectorAll('.story-text');
    const walkingSpongebob = document.querySelector('.walking-spongebob');
    const roadContainer = document.querySelector('.road-container');
    const finalRoad = document.querySelector('.final-road');
    const arrowIndicator = document.querySelector(".arrow-indicator");

    let isTransitioning = false;
    let lastScrollTop = 0;
    let firstTransition = true;
    let bubbleInterval;

    // 버블 생성 함수
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const size = Math.random() * 40 + 30;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        
        bubble.style.left = Math.random() * 100 + 'vw';
        bubble.style.bottom = '-100px';
        
        document.body.appendChild(bubble);
        
        const animation = bubble.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: 'translateY(-100vh) rotate(360deg)', opacity: 0 }
        ], {
            duration: 2500,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => bubble.remove();
    }

    // 인터섹션 옵저버 설정
    const transitionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target.id === 'section2') {
                if (entry.isIntersecting && !isTransitioning) {
                    isTransitioning = true;
                    walkingSpongebob.classList.add('start-animation');
                    bubbleInterval = setInterval(createBubble, 30);
                    
                    setTimeout(() => {
                        clearInterval(bubbleInterval);
                        isTransitioning = false;
                        firstTransition = false;
                    }, 2000);
                }
            }
        });
    }, { threshold: 0.2 });

    transitionObserver.observe(section2);

    // 섹션의 위치를 계산하는 함수
    function calculateSectionPositions() {
        const section2Start = section1.offsetHeight;
        const section2End = section2Start + section2.offsetHeight;
        const section3Start = section2End;
        return { section2Start, section2End, section3Start };
    }

    // 스크롤 이벤트 핸들러
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const { section2Start, section2End, section3Start } = calculateSectionPositions();
        const scrollProgress = (scrollTop - section2Start) / (section2.offsetHeight - window.innerHeight);
    
        // 🏠 섹션 2에서 집게리아(`final-road`)가 보이지 않도록 처리
        if (scrollTop < section3Start && scrollTop >= section2Start) {
            finalRoad.classList.add('hidden'); // 섹션2에서는 집게리아 숨김
        } else {
            finalRoad.classList.remove('hidden'); // 섹션3에서는 다시 보이도록
        }
    
        // 📜 섹션2의 스크롤 진행에 따른 처리
        if (scrollTop >= section2Start && scrollTop < section2End) {
            handleSection2(scrollTop, section2Start, scrollProgress);
        }
        // 🚧 섹션2에서 3으로의 전환 처리
        else if (scrollTop >= section2End - 100 && !isTransitioning) {
            handleTransitionToSection3();
        }
        // 🏠 섹션3에서의 동작 처리
        else if (scrollTop >= section3Start) {
            handleSection3();
        }
        // 🔄 섹션1으로 돌아갔을 때 초기화
        else {
            resetElements();
        }
    });
    
    

    // 섹션 2 동작 처리
    function handleSection2(scrollPosition, section2Start, scrollProgress) {
        roadContainer.style.position = 'fixed';
        roadContainer.style.bottom = '0';
        roadContainer.style.width = '200%';
        roadContainer.style.display = 'block';
        
        walkingSpongebob.style.position = 'fixed';
        walkingSpongebob.style.bottom = '50px';
        walkingSpongebob.style.left = '10%';
        walkingSpongebob.style.display = 'block';
        
        container.style.display = 'flex';
        container.style.position = 'fixed';
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%)';

        // 스토리 텍스트 업데이트
        updateStoryTexts(scrollProgress);
    }

    // 섹션 2에서 3으로의 전환 처리
    function handleTransitionToSection3() {
        console.log("🚧 섹션 3으로 전환 중...");
        isTransitioning = true;
    
        // 🏁 기존 도로를 서서히 사라지게 설정
        roadContainer.style.transform = 'translateX(-100%)';
        roadContainer.style.transition = 'transform 5s ease-in-out';
    
        // 🏃‍♂️ 스폰지밥도 도로와 함께 이동
        walkingSpongebob.style.transform = 'translateX(-100%)';
        walkingSpongebob.style.transition = 'transform 5s ease-in-out';
    
        // 🏁 섹션3 도로(집게리아) 등장
        finalRoad.style.display = 'block';
        finalRoad.style.right = '-100%';
        finalRoad.style.opacity = '1';
    
        setTimeout(() => {
            finalRoad.style.transition = 'right 5s ease-in-out';
            finalRoad.style.right = '0';
        }, 100);
    
        // 🏃‍♂️ 걷는 스폰지밥이 섹션3에서도 유지되도록 설정
        setTimeout(() => {
            roadContainer.style.display = 'none';
            walkingSpongebob.style.display = 'block';
            walkingSpongebob.classList.add('walking-spongebob.move-to-krusty'); // 섹션3에서도 계속 걷기
        }, 5000);
    
        setTimeout(() => {
            isTransitioning = false;
        }, 6000);
    }

    // 섹션 3 처리
    function handleSection3() {
        console.log("섹션 3 활성화!");
        const section3 = document.getElementById('section3');
        section3.style.opacity = '1'; // 섹션3 페이드 인
    
        // 걷는 스폰지밥이 오른쪽으로 이동
        setTimeout(() => {
            walkingSpongebob.classList.add('walking-spongebob.move-to-krusty'); // 오른쪽으로 이동
        }, 500);
    
        // 5초 후 크러스티 크랩 앞에서 멈추고 잠시 대기 후 페이드 아웃
        setTimeout(() => {
            walkingSpongebob.classList.add('fade-out'); // 서서히 사라짐
        }, 6000);
    }

    // 요소 초기화
    function resetElements() {
        roadContainer.style.display = 'none';
        walkingSpongebob.style.display = 'none';
        container.style.display = 'none';
        finalRoad.style.display = 'none';
    }

    // 스토리 텍스트 업데이트
    function updateStoryTexts(scrollProgress) {
        const totalTexts = storyTexts.length;
        const activeIndex = Math.floor(scrollProgress * totalTexts);
        
        storyTexts.forEach((text, index) => {
            if (index === activeIndex) {
                text.classList.add('visible');
                text.style.opacity = '1';
                text.style.transform = 'translateX(0) scale(1)';
            } else {
                text.classList.remove('visible');
                text.style.opacity = '0';
                text.style.transform = index < activeIndex ? 
                    'translateX(-100vw) scale(0.8)' : 
                    'translateX(100vw) scale(0.8)';
            }
        });
    }

    // 성능 최적화를 위한 함수
    function optimizeAnimation(callback) {
        let ticking = false;
        return function(e) {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    callback(e);
                    ticking = false;
                });
                ticking = true;
            }
        };
    }

    // 배경 음악 설정
    const bgMusic = new Audio('audio/sponebob.mp3');
    bgMusic.loop = true;
    
    const musicToggle = document.createElement('button');
    musicToggle.className = 'music-toggle';
    musicToggle.innerHTML = '🎵';
    document.body.appendChild(musicToggle);

    let isMusicPlaying = false;
    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicToggle.style.opacity = '0.5';
        } else {
            bgMusic.play();
            musicToggle.style.opacity = '1';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // 진행 상태 표시기 추가
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    // 스크롤 진행률 업데이트
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});

function handleTransitionToSection3() {
    console.log("섹션 3으로 전환 중..."); // 디버깅용 로그
    isTransitioning = true;

    roadContainer.style.transform = 'translateX(-100%)';
    roadContainer.style.transition = 'transform 2s ease-out';

    walkingSpongebob.style.transform = 'translateX(-100%)';
    walkingSpongebob.style.transition = 'transform 2s ease-out';

    finalRoad.style.display = 'block';
    finalRoad.style.opacity = '1';
    finalRoad.style.right = '-100%';

    setTimeout(() => {
        finalRoad.style.transition = 'right 2s ease-out';
        finalRoad.style.right = '0';
    }, 100);

    setTimeout(() => {
        roadContainer.style.display = 'none';
        walkingSpongebob.style.display = 'none';
        container.style.display = 'none';
        isTransitioning = false;
        console.log("섹션 3으로 전환 완료.");
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    const finalRoad = document.querySelector('.final-road');
    const arrowIndicator = document.querySelector('.arrow-indicator');
    const overlay = document.createElement('div');
    overlay.classList.add('krusty-krab-overlay');
    document.body.appendChild(overlay);

    // 트랜지션 완료 감지
    finalRoad.addEventListener('transitionend', () => {
        // 도로 이미지가 완전히 들어온 후 화살표와 오버레이 표시
        setTimeout(() => {
            arrowIndicator.classList.add('visible');
            overlay.classList.add('visible');
        }, 200); // 약간의 지연 추가
    });

    // 오버레이 클릭 이벤트
    overlay.addEventListener('click', () => {
        window.location.href = 'krustykrab-inside.html';
    });
});
