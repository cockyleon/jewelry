window.onload = () => {
  const data = {};
  const $ = window.document.querySelector.bind(window.document);
  
  // Header滚动控制
  let lastScrollTop = 0;
  const headerWrapper = document.querySelector('.header-wrapper');
  let isAnimating = false;
  
  // 处理动画
  function animateHeader(show) {
    if (isAnimating) return;
    isAnimating = true;
    
    if (show) {
      headerWrapper.classList.remove('header-hidden');
      headerWrapper.classList.add('header-visible');
    } else {
      headerWrapper.classList.remove('header-visible');
      headerWrapper.classList.add('header-hidden');
    }
    
    // 动画结束后重置状态
    setTimeout(() => {
      isAnimating = false;
    }, 300);
  }
  
  // 处理滚动事件
  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 在顶部区域时始终显示完整header
    if (scrollTop < 50) {
      animateHeader(true);
    } 
    // 根据滚动方向立即显示/隐藏header
    else {
      // 向上滚动显示，向下滚动隐藏
      const isScrollingDown = scrollTop > lastScrollTop;
      animateHeader(!isScrollingDown);
    }
    
    lastScrollTop = scrollTop;
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
  animateHeader(true);
};
