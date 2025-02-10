window.onload = () => {
  const isMobile = window.innerWidth <= 768;
  const headerWrapper = document.querySelector('.header-wrapper');
  const menuBtn = document.querySelector('.container');
  const headerBody = document.querySelector('.header-common.body');
  let lastScrollTop = 0;
  let isAnimating = false;
  let scrollTimeout = null;

  // 创建遮罩层
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);

  // 滚动动画处理
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.picture, .long-banner, .long-banner-3-1, .long-banner-5-1, .long-banner-6, .title, .title-1, .title-2, .caption, .caption-1, .detail, .detail-1, .detail-2, .detail-3, .desc, .desc-1, .word-1, .word-2, .more, .label-1, .horizontal-line-3, [class*="container-"] *');
    
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.9 && elementBottom > 0 && !element.classList.contains('visible')) {
        element.classList.add('visible');
      }
    });
  };

  // 移动端菜单处理
  function toggleMobileMenu() {
    headerBody.classList.toggle('menu-active');
    overlay.classList.toggle('active');
    menuBtn.classList.toggle('menu-active');
    document.body.style.overflow = headerBody.classList.contains('menu-active') ? 'hidden' : '';
  }

  // 处理动画
  function animateHeader(show) {
    if (isAnimating || isMobile) return;
    isAnimating = true;
    
    if (show) {
      headerWrapper.classList.remove('header-hidden');
      headerWrapper.classList.add('header-visible');
    } else {
      headerWrapper.classList.remove('header-visible');
      headerWrapper.classList.add('header-hidden');
    }
    
    setTimeout(() => {
      isAnimating = false;
    }, 400);
  }

  // 处理滚动事件
  function handleScroll() {
    if (isMobile) return;

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // 只在滚动到顶部时显示header
      if (scrollTop <= 500) {
        animateHeader(true);
      } else {
        animateHeader(false);
      }
      
      lastScrollTop = scrollTop;
    }, 10);

    requestAnimationFrame(animateOnScroll);
  }

  // 事件监听和初始化
  if (isMobile) {
    menuBtn.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', toggleMobileMenu);
    headerBody.addEventListener('click', (e) => e.stopPropagation());
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  if (!isMobile) {
    animateHeader(true);
  }
  
  requestAnimationFrame(animateOnScroll);

  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
      location.reload();
    }
  });
};
