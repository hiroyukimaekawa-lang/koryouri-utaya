/**
 * 小料理 詩や - 公式ホームページ
 * スクロール時のフェードインアニメーション実装
 * IntersectionObserverを使用した軽量な実装
 */

(function () {
    'use strict';

    // DOMContentLoaded後に実行
    document.addEventListener('DOMContentLoaded', function () {
        initScrollAnimation();
        initSmoothScroll();
        initHamburgerMenu();
    });

    /**
     * ハンバーガーメニューの実装
     */
    function initHamburgerMenu() {
        const hamburgerBtn = document.querySelector('.hamburger-menu');
        const navList = document.querySelector('.nav-list');
        const navLinks = document.querySelectorAll('.nav-list a');

        if (hamburgerBtn && navList) {
            hamburgerBtn.addEventListener('click', function () {
                this.classList.toggle('active');
                navList.classList.toggle('active');
            });

            navLinks.forEach(function (link) {
                link.addEventListener('click', function () {
                    hamburgerBtn.classList.remove('active');
                    navList.classList.remove('active');
                });
            });
        }
    }

    /**
     * スクロール時のフェードインアニメーション
     * IntersectionObserverを使用
     */
    function initScrollAnimation() {
        // アニメーション対象の要素を取得
        const fadeElements = document.querySelectorAll('.fade-in');

        // IntersectionObserverのオプション設定
        const observerOptions = {
            root: null, // ビューポートを基準にする
            rootMargin: '0px 0px -50px 0px', // 要素が50px見えたら発火
            threshold: 0.1 // 要素の10%が見えたら発火
        };

        // IntersectionObserverのコールバック関数
        const observerCallback = function (entries) {
            entries.forEach(function (entry) {
                // 要素がビューポートに入ったら
                if (entry.isIntersecting) {
                    // visibleクラスを追加してアニメーション実行
                    entry.target.classList.add('visible');

                    // 一度アニメーションが実行されたら監視を停止（パフォーマンス向上）
                    observer.unobserve(entry.target);
                }
            });
        };

        // IntersectionObserverインスタンスを作成
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // 各要素を監視対象に追加
        fadeElements.forEach(function (element) {
            observer.observe(element);
        });
    }

    /**
     * スムーススクロール実装
     * アンカーリンククリック時のスムーズなスクロール
     */
    function initSmoothScroll() {
        // アンカーリンクを取得
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // #のみの場合は処理しない
                if (href === '#' || href === '#!') {
                    return;
                }

                // ターゲット要素を取得
                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();

                    // ヘッダー分のオフセットを考慮
                    const headerOffset = 0;
                    const targetPosition = target.offsetTop - headerOffset;

                    // スムーズにスクロール
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
})();
