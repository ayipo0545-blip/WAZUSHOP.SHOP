document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. BASE DE DONNÉES ---
    const allProducts = [
        { id: 8, name: "iPhone Premium Edition Wazu", price: 450000, category: "tech", img: "https://i.ibb.co/LzQLY9Q8/affiche0.jpg", desc: "Édition spéciale sélectionnée pour sa fiabilité et sa performance exceptionnelle." },
        { id: 9, name: "Pack Promo Tech Abidjan", price: 350000, category: "tech", img: "https://i.ibb.co/DfX0B3cd/unnamed.jpg", desc: "Profitez de nos offres exclusives sur toute la gamme High-Tech ce mois-ci." },
        { id: 10, name: "Catalogue WazuShop Complet", price: 0, category: "bible", img: "https://i.ibb.co/204vqbPB/Gemini-Generated-Image-qdzgrwqdzgrwqdzg.png", desc: "Découvrez notre sélection unique mélangeant Foi et Technologie." },
        { id: 1, name: "Bible Thompson (LSG)", price: 25000, category: "bible", img: "https://i.ibb.co/399djqBg/affiche1.jpg", desc: "La Bible d'étude de référence avec système de chaînes thématiques." },
        { id: 2, name: "Sainte Bible Version Semeur", price: 20000, category: "bible", img: "https://i.ibb.co/GQf3qGMM/affiche2.jpg", desc: "Version moderne et accessible, idéale pour une lecture fluide." },
        { id: 3, name: "Bible Segond 1910 Zippée", price: 15000, category: "bible", img: "https://i.ibb.co/ZpVY6GN9/affiche3.jpg", desc: "Format pratique avec fermeture éclair pour protéger les pages." },
        { id: 11, name: "iPhone 15 Pro Max", price: 850000, category: "tech", img: "https://images.pexels.com/photos/14666017/pexels-photo-14666017.jpeg?auto=compress&cs=tinysrgb&w=400", desc: "Écran Super Retina XDR 6.7 pouces, Puce A17 Pro." }
    ];

    // Génération automatique (complément à 100)
    const extraCats = ["home", "access"];
    const extraNames = ["Mixeur Pro", "Sac Luxe", "Montre Quartz", "Ventilateur", "Casque Audio", "Machine Café"];
    while(allProducts.length < 100) {
        let randomId = allProducts.length + 1;
        let randomCat = extraCats[Math.floor(Math.random() * extraCats.length)];
        let randomName = extraNames[Math.floor(Math.random() * extraNames.length)];
        allProducts.push({ 
            id: randomId, 
            name: `${randomName} WAZU-X${randomId}`, 
            price: 15000 + (randomId * 150), 
            category: randomCat, 
            img: `https://picsum.photos/seed/${randomId}/400`,
            desc: "Produit de qualité supérieure sélectionné par Wazushop pour le marché d'Abidjan."
        });
    }

    let displayedCount = 12;
    let currentFilter = 'all';
    const grid = document.getElementById('product-list');
    window.cart = JSON.parse(localStorage.getItem('wazuCart')) || [];

    // --- 2. GESTION DE LA MODALE PRODUIT ---
    const modal = document.getElementById('product-modal');

    window.openModal = function(productId) {
        const product = allProducts.find(p => p.id === productId);
        if (!product) return;

        // Remplissage des éléments de la modale
        document.getElementById('modal-img').src = product.img;
        document.getElementById('modal-title').innerText = product.name;
        document.getElementById('modal-price').innerText = product.price.toLocaleString() + " F";
        document.getElementById('modal-description').innerText = product.desc;

        // Configuration du bouton d'ajout dans la modale
        const addBtn = document.getElementById('modal-add-btn');
        addBtn.onclick = function() {
            addToCart(product.name, product.price);
            closeModal();
        };

        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Empêche le défilement derrière
    };

    window.closeModal = function() {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto'; // Réactive le défilement
    };

    // Fermer la modale si on clique à l'extérieur du contenu
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // --- 3. RENDU PRODUITS ---
    function renderProducts() {
        if (!grid) return;
        grid.innerHTML = "";
        let filtered = allProducts.filter(p => currentFilter === 'all' || p.category === currentFilter);
        const searchInput = document.getElementById('search-input');
        const searchVal = searchInput ? searchInput.value.toLowerCase() : "";
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchVal));
        const toShow = filtered.slice(0, displayedCount);
        
        if(toShow.length === 0) {
            grid.innerHTML = "<p style='grid-column: 1/-1; text-align:center; padding:20px;'>Aucun article trouvé.</p>";
        }

        toShow.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image">
                    <img src="${p.img}" alt="${p.name}" loading="lazy" onclick="openModal(${p.id})" style="cursor:zoom-in;">
                </div>
                <div class="product-info" style="padding:15px;">
                    <h3 class="product-title" onclick="openModal(${p.id})" style="cursor:pointer; font-size:1rem; margin-bottom:10px;">${p.name}</h3>
                    <p class="price" style="color:#e67e22; font-weight:bold; font-size:1.1rem; margin-bottom:10px;">${p.price.toLocaleString()} F</p>
                    <button class="add-to-cart" onclick="addToCart('${p.name.replace(/'/g, "\\'")}', ${p.price})">J'ACHÈTE</button>
                </div>`;
            grid.appendChild(card);
        });

        const loadMoreBtn = document.getElementById('load-more-container');
        if (loadMoreBtn) loadMoreBtn.style.display = (displayedCount >= filtered.length) ? 'none' : 'block';
    }

    // --- 4. GESTION PANIER ---
    window.addToCart = function(name, price) {
        window.cart.push({ name, price });
        updateCartUI();
        // Optionnel : Animation ou notification
    };

    window.updateCartUI = function() {
        localStorage.setItem('wazuCart', JSON.stringify(window.cart));
        const countEl = document.getElementById('cart-count');
        const container = document.getElementById('cart-items');
        const totalEl = document.getElementById('cart-total-val');
        
        if (countEl) {
            countEl.innerText = window.cart.length;
        }

        if (container) {
            container.innerHTML = "";
            let total = 0;
            window.cart.forEach((item, index) => {
                total += item.price;
                const itemDiv = document.createElement('div');
                itemDiv.style = "display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px; font-size:0.85rem;";
                itemDiv.innerHTML = `
                    <div style="flex:1;">${item.name}</div>
                    <div style="font-weight:bold; margin: 0 10px;">${item.price.toLocaleString()} F</div>
                    <i class="fas fa-trash" onclick="removeFromCart(${index})" style="color:#ff4444; cursor:pointer;"></i>
                `;
                container.appendChild(itemDiv);
            });
            if (totalEl) totalEl.innerText = total.toLocaleString();
        }
    };

    window.removeFromCart = function(index) {
        window.cart.splice(index, 1);
        updateCartUI();
    };

    window.clearCart = function() {
        if (confirm("Voulez-vous vraiment vider tout votre panier ?")) {
            window.cart = [];
            updateCartUI();
        }
    };

    window.toggleCart = function() {
        document.getElementById('cart-sidebar').classList.toggle('open');
    };

    // --- 5. WHATSAPP & CONTACT ---
    window.sendWhatsApp = function() {
        if (window.cart.length === 0) return alert("Votre panier est vide");
        let msg = "*COMMANDE WAZUSHOP*\n--------------------------\n";
        window.cart.forEach((item, i) => msg += `${i + 1}. ${item.name} (${item.price.toLocaleString()} F)\n`);
        msg += `\n*TOTAL : ${document.getElementById('cart-total-val').innerText} F CFA*`;
        window.open(`https://wa.me/2250708737307?text=${encodeURIComponent(msg)}`, '_blank');
    };

    window.sendContactWA = function(e) {
        if(e) e.preventDefault();
        const name = document.getElementById('contact-name').value;
        const text = document.getElementById('contact-msg').value;
        const msg = `*CONTACT WAZUSHOP*\n*Nom:* ${name}\n*Message:* ${text}`;
        window.open(`https://wa.me/2250708737307?text=${encodeURIComponent(msg)}`, '_blank');
    };

    // --- 6. FILTRES ET SLIDER ---
    window.filterCategory = function(cat) {
        currentFilter = cat; 
        displayedCount = 12;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if(btn.getAttribute('onclick').includes(`'${cat}'`)) btn.classList.add('active');
        });
        renderProducts();
    };

    window.loadMore = function() { displayedCount += 12; renderProducts(); };

    let slideIndex = 0;
    setInterval(() => {
        const slides = document.querySelectorAll(".slide");
        if (slides.length > 1) {
            slides.forEach(s => s.classList.remove("active"));
            slideIndex = (slideIndex + 1) % slides.length;
            slides[slideIndex].classList.add("active");
        }
    }, 5000);

    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.addEventListener('input', () => { displayedCount = 12; renderProducts(); });

    // Initialisation au chargement
    updateCartUI();
    renderProducts();
});
