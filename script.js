document.addEventListener('DOMContentLoaded', function() {
    // URLからクエリパラメータを解析
    const params = new URLSearchParams(window.location.search);
    const widgetContainer = document.getElementById('widget');
    
    // ウィジェット設定を取得
    const config = {
        type: params.get('type') || 'remaining',
        title: params.get('title') || '',
        startDate: params.get('startDate'),
        endDate: params.get('endDate'),
        color: params.get('color') || ''
    };
    
    // パラメータが不足している場合はデフォルト値を設定
    if (!config.startDate && !config.endDate) {
        const today = new Date();
        if (config.type === 'remaining' || config.type === 'progress') {
            // デフォルトは年末
            config.endDate = new Date(today.getFullYear(), 11, 31).toISOString().split('T')[0];
        }
        if (config.type === 'passed' || config.type === 'progress') {
            // デフォルトは年始
            config.startDate = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0];
        }
    }
    
    // ウィジェットを作成
    createWidget(widgetContainer, config);
    
    // 1時間ごとに更新
    setInterval(() => {
        updateWidget(widgetContainer, config);
    }, 3600000);
});

// Helper function to check for valid hex color
function isValidHexColor(color) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(color);
}

// ウィジェットを作成する関数
function createWidget(container, config) {
    // コンテナにクラスを設定 (フォールバック用)
    container.className = `widget`; // Remove color class initially
    container.dataset.type = config.type;
    container.dataset.startDate = config.startDate || '';
    container.dataset.endDate = config.endDate || '';
    
    // タイトル要素 (タイトルが指定されている場合のみ作成)
    if (config.title) {
        const title = document.createElement('h2');
        title.className = 'widget-title';
        title.textContent = config.title;
        container.appendChild(title);
    }
    
    // 値要素
    const value = document.createElement('div');
    value.className = 'widget-value';

    // Apply color: hex code takes precedence
    if (config.color && isValidHexColor(config.color)) {
        value.style.color = config.color;
    } else if (config.color) {
        // Fallback to class-based color if not a valid hex
        container.classList.add(config.color);
    }
    
    // コンテナに追加 (タイトルは条件付きで追加済み)
    container.appendChild(value);
    
    // 値を更新
    updateWidget(container, config);
}

// ウィジェットの値を更新する関数
function updateWidget(container, config) {
    const type = container.dataset.type;
    const startDate = container.dataset.startDate ? new Date(container.dataset.startDate) : null;
    const endDate = container.dataset.endDate ? new Date(container.dataset.endDate) : null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const valueElement = container.querySelector('.widget-value');
    
    switch (type) {
        case 'remaining':
            if (endDate) {
                const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
                valueElement.textContent = `${Math.max(0, daysRemaining)}日`;
            } else {
                valueElement.textContent = 'N/A';
            }
            break;
            
        case 'passed':
            if (startDate) {
                const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
                valueElement.textContent = `${Math.max(0, daysPassed)}日`;
            } else {
                valueElement.textContent = 'N/A';
            }
            break;
            
        case 'progress':
            if (startDate && endDate) {
                const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
                const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
                const progress = Math.floor((daysPassed / totalDays) * 100);
                valueElement.textContent = `${Math.min(100, Math.max(0, progress))}%`;
            } else {
                valueElement.textContent = 'N/A';
            }
            break;
            
        default:
            valueElement.textContent = 'N/A';
    }
}
