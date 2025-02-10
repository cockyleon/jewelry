window.onload = () => {
  const isMobile = window.innerWidth <= 768;
  const headerWrapper = document.querySelector('.header-wrapper');
  const menuBtn = document.querySelector('.container');
  const headerBody = document.querySelector('.header-common.body');
  let isAnimating = false;
  let lastScrollTop = 0;

  // 创建遮罩层
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);

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
    }, 300);
  }
  
  // 处理滚动事件
  function handleScroll() {
    if (isMobile) return;  // 移动端不处理滚动事件

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop < 50) {
      animateHeader(true);
    } else {
      const isScrollingDown = scrollTop > lastScrollTop;
      animateHeader(!isScrollingDown);
    }
    
    lastScrollTop = scrollTop;
  }
  
  // 移动端点击事件
  if (isMobile) {
    menuBtn.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', toggleMobileMenu);

    // 阻止菜单内部点击事件冒泡到遮罩层
    headerBody.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
  
  // 使用 requestAnimationFrame 优化滚动事件
  let rafId = null;
  window.addEventListener('scroll', () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(handleScroll);
  }, { passive: true });
  
  // 初始化header状态
  if (!isMobile) {
    animateHeader(true);
  }

  // 处理窗口大小变化
  window.addEventListener('resize', () => {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
      location.reload();  // 在移动端和桌面端切换时刷新页面
    }
  });
};
