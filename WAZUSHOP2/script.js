document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. BASE DE DONNÉES (100 PRODUITS) ---
    const allProducts = [
        // BIBLES
        { id: 1, name: "Bible Thompson (Louis Segond)", price: 25000, category: "bible", img: "https://images.pexels.com/photos/11513220/pexels-photo-11513220.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { id: 2, name: "Sainte Bible Version Semeur", price: 20000, category: "bible", img: "https://images.pexels.com/photos/5841764/pexels-photo-5841764.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { id: 3, name: "Bible Segond 1910 Zippée", price: 15000, category: "bible", img: "https://images.pexels.com/photos/415571/pexels-photo-415571.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { id: 4, name: "Bible de Poche Voyage", price: 8000, category: "bible", img: "https://images.pexels.com/photos/10185012/pexels-photo-10185012.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { id: 5, name: "Bible d'Étude Scofield", price: 25000, category: "bible", img: "https://images.pexels.com/photos/6817112/pexels-photo-6817112.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { id: 6, name: "Bible Parole de Vie", price: 15000, category: "bible", img: "https://images.pexels.com/photos/2723330/pexels-photo-2723330.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { id: 7, name: "Bible Traduction Ostervald", price: 20000, category: "bible", img: "https://images.pexels.com/photos/10185012/pexels-photo-10185012.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { id: 8, name: "Nouveau Testament + Psaumes", price: 8000, category: "bible", img: "https://images.pexels.com/photos/5841764/pexels-photo-5841764.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { id: 9, name: "Bible Vie Nouvelle Étude", price: 25000, category: "bible", img: "https://images.pexels.com/photos/11513220/pexels-photo-11513220.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { id: 10, name: "Bible Segond 21 Design", price: 15000, category: "bible", img: "https://images.pexels.com/photos/415571/pexels-photo-415571.jpeg?auto=compress&cs=tinysrgb&w=200" },

        // TECH
        { id: 11, name: "iPhone 15 Pro Max", price: 850000, category: "tech", img: "https://images.pexels.com/photos/14666017/pexels-photo-14666017.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { id: 12, name: "Samsung S24 Ultra", price: 790000, category: "tech", img: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { id: 13, name: "PlayStation 5 Slim", price: 420000, category: "tech", img: "https://images.pexels.com/photos/5948332/pexels-photo-5948332.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { id: 14, name: "AirPods Pro 2", price: 165000, category: "tech", img: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { id: 15, name: "MacBook Air M2", price: 750000, category: "tech", img: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=200" },
        { id: 16, name: "JBL Flip 6", price: 75000, category: "tech", img: "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { id: 17, name: "iPad Air M1", price: 380000, category: "tech", img: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { id: 18, name: "Casque Bose QC45", price: 195000, category: "tech", img: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { id: 19, name: "Drone DJI Mini 3", price: 350000, category: "tech", img: "https://images.pexels.com/photos/1034812/pexels-photo-1034812.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { id: 20, name: "Smartwatch Series 9", price: 295000, category: "tech", img: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=200" }
    ];

    // Génération automatique pour atteindre 100 produits (Bricolage, Maison, Accessoires)
    const extraCats = ["home", "access"];
    const extraNames = ["Mixeur", "Sac Luxe", "Fer à repasser", "Parfum Homme", "Montre Quartz", "Ventilateur"];
    
    while(allProducts.length < 100) {
        let randomId = allProducts.length + 1;
        let randomCat = extraCats[Math.floor(Math.random() * extraCats.length)];
        let randomName = extraNames[Math.floor(Math.random() * extraNames.length)];
        allProducts.push({ 
            id: randomId, 
            name: `${randomName} Modèle-X${randomId}`, 
            price: 15000 + (randomId * 100), 
            category: randomCat, 
            img: `https://picsum.photos/200?random=${randomId}` 
        });
    }

    // --- 2. LOGIQUE D'AFFICHAGE ---
    let displayedCount = 12;
    let currentFilter = 'all';
    const grid = document.getElementById('product-list');
    window.cart = [];

    function renderProducts() {
        if (!grid) return;
        grid.innerHTML = "";
        
        let filtered = allProducts.filter(p => currentFilter === 'all' || p.category === currentFilter);
        const searchInput = document.getElementById('search-input');
        const searchVal = searchInput ? searchInput.value.toLowerCase() : "";
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchVal));

        const toShow = filtered.slice(0, displayedCount);
        toShow.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
                <h3 class="product-title">${p.name}</h3>
                <p class="price">${p.price.toLocaleString()} F</p>
                <button class="add-to-cart" onclick="addToCart('${p.name.replace(/'/g, "\\'")}', ${p.price})">J'ACHÈTE</button>`;
            grid.appendChild(card);
        });

        const loadMoreBtn = document.getElementById('load-more-container');
        if (loadMoreBtn) loadMoreBtn.style.display = displayedCount >= filtered.length ? 'none' : 'block';
    }

    // --- 3. FONCTIONS GLOBALES (WINDOW) ---
    window.loadMore = function() { displayedCount += 12; renderProducts(); };
    
    window.filterCategory = function(cat) {
        currentFilter = cat; displayedCount = 12;
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        if (event && event.target) event.target.classList.add('active');
        renderProducts();
    };

    window.toggleCart = function() {
        document.getElementById('cart-sidebar').classList.toggle('open');
    };

    window.addToCart = function(name, price) {
        window.cart.push({ name, price });
        updateCartUI();
        const sidebar = document.getElementById('cart-sidebar');
        if(!sidebar.classList.contains('open')) sidebar.classList.add('open');
    };

    window.clearCart = function() {
        if (confirm("Vider le panier ?")) { window.cart = []; updateCartUI(); }
    };

    function updateCartUI() {
        const countEl = document.getElementById('cart-count');
        const container = document.getElementById('cart-items');
        const totalEl = document.getElementById('cart-total-val');
        
        if (countEl) countEl.innerText = window.cart.length;
        if (container) {
            container.innerHTML = "";
            let total = 0;
            window.cart.forEach((item, index) => {
                total += item.price;
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `<span>${item.name}</span><strong>${item.price.toLocaleString()} F</strong>`;
                container.appendChild(itemDiv);
            });
            if (totalEl) totalEl.innerText = total.toLocaleString();
        }
    }

    window.sendWhatsApp = function() {
        if (window.cart.length === 0) return alert("Panier vide");
        let msg = "*COMMANDE WAZUSHOP*\n------------------\n";
        window.cart.forEach((item, i) => msg += `${i + 1}. ${item.name} - ${item.price.toLocaleString()} F\n`);
        msg += `\n*TOTAL : ${document.getElementById('cart-total-val').innerText} F CFA*`;
        msg += `\n\n_Veuillez confirmer ma livraison._`;
        window.open(`https://wa.me/2250708737307?text=${encodeURIComponent(msg)}`, '_blank');
    };

    window.sendContactWA = function(e) {
        if(e) e.preventDefault();
        const name = document.getElementById('contact-name').value;
        const text = document.getElementById('contact-msg').value;
        const msg = `*NOUVEAU CONTACT WAZUSHOP*\n*Nom:* ${name}\n*Message:* ${text}`;
        window.open(`https://wa.me/2250708737307?text=${encodeURIComponent(msg)}`, '_blank');
    };

    // --- 4. SLIDER AUTOMATIQUE ---
    let slideIndex = 0;
    function autoSlider() {
        const slides = document.querySelectorAll(".slide");
        if (slides.length > 0) {
            slides.forEach(s => s.classList.remove("active"));
            slideIndex = (slideIndex + 1) % slides.length;
            slides[slideIndex].classList.add("active");
        }
        setTimeout(autoSlider, 5000);
    }

    // --- INITIALISATION ---
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.addEventListener('input', renderProducts);

    renderProducts();
    autoSlider();
});