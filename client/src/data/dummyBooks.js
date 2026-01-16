const dummyBooks = [
    // --- FICTION & FANTASY (Series Example for "Series Builder") ---
    {
        id: 1,
        title: "The Crystal Kingdom",
        author: "Elena Vance",
        genre: "Fiction",
        price: 14.99,
        rating: 4.8,
        coverImage: "https://placehold.co/400x600?text=The+Crystal+Kingdom",
        synopsis: "The first installment of the Crystal Saga. A young mage discovers a secret that could destroy the empire.",
        isSeries: true,
        seriesName: "Crystal Saga",
        seriesOrder: 1,
        stockStatus: "In Stock"
    },
    {
        id: 2,
        title: "The Shattered Throne",
        author: "Elena Vance",
        genre: "Fiction",
        price: 14.99,
        rating: 4.9,
        coverImage: "https://placehold.co/400x600?text=The+Shattered+Throne",
        synopsis: "Book 2 of the Crystal Saga. War has come to the capital, and alliances are broken.",
        isSeries: true,
        seriesName: "Crystal Saga",
        seriesOrder: 2,
        stockStatus: "In Stock"
    },

    // --- ACADEMIC TEXTS (For "Academic" Category) ---
    {
        id: 3,
        title: "Advanced Database Systems",
        author: "Dr. Riaz Ahmad",
        genre: "Academic",
        price: 59.99,
        rating: 4.5,
        coverImage: "https://placehold.co/400x600?text=DB+Systems",
        synopsis: "A comprehensive guide to SQL Server architecture, indexing, and query optimization.",
        isSeries: false,
        stockStatus: "In Stock"
    },
    {
        id: 4,
        title: "Modern Web Architecture",
        author: "Sarah Jenkins",
        genre: "Academic",
        price: 45.00,
        rating: 4.7,
        coverImage: "https://placehold.co/400x600?text=Web+Architecture",
        synopsis: "Learn how to build scalable applications using React, Node.js, and Microservices.",
        isSeries: false,
        stockStatus: "In Stock"
    },

    // --- GRAPHIC NOVELS ---
    {
        id: 5,
        title: "Neon City Blues",
        author: "Kai Sato",
        genre: "Graphic Novel",
        price: 19.99,
        rating: 4.9,
        coverImage: "https://placehold.co/400x600?text=Neon+City",
        synopsis: "A cyberpunk noir tale set in a city that never sleeps. Full color illustrations.",
        isSeries: false,
        stockStatus: "In Stock"
    },

    // --- THRILLER & MYSTERY ---
    {
        id: 6,
        title: "The Silent Watcher",
        author: "Marcus Black",
        genre: "Fiction",
        price: 12.50,
        rating: 4.2,
        coverImage: "https://placehold.co/400x600?text=Silent+Watcher",
        synopsis: "A detective returns to his hometown to solve a cold case that involves his own family.",
        isSeries: false,
        stockStatus: "In Stock"
    },

    // --- MIDNIGHT VAULT EXCLUSIVE (For "Midnight Release Vault" logic) ---
    {
        id: 7,
        title: "The Midnight Protocol (Signed Edition)",
        author: "J.K. Sterling",
        genre: "Sci-Fi",
        price: 99.99,
        rating: 5.0,
        coverImage: "https://placehold.co/400x600?text=Midnight+Protocol",
        synopsis: "Limited edition signed copy. Only available between 12:00 AM and 3:00 AM.",
        isVaultItem: true,
        releaseTime: "00:00:00",
        stockStatus: "Limited"
    },

    // --- BLIND DATE WITH A BOOK (For "Blind Date" feature) ---
    {
        id: 8,
        title: "Mystery Date #402",
        author: "Unknown",
        genre: "Mystery",
        price: 15.00,
        rating: null,
        coverImage: "https://placehold.co/400x600?text=Blind+Date",
        synopsis: "Don't judge a book by its cover. Tropes: Victorian Era, Plot Twist, Gothic Romance.",
        isBlindDate: true,
        tropes: ["Victorian", "Plot Twist", "Gothic"],
        stockStatus: "In Stock"
    },

    // --- CLASSICS ---
    {
        id: 9,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Fiction",
        price: 9.99,
        rating: 4.8,
        coverImage: "https://placehold.co/400x600?text=Pride+Prejudice",
        synopsis: "The classic tale of Elizabeth Bennet and Mr. Darcy.",
        isSeries: false,
        stockStatus: "In Stock"
    },

    // --- SELF HELP ---
    {
        id: 10,
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Non-Fiction",
        price: 22.00,
        rating: 4.9,
        coverImage: "https://placehold.co/400x600?text=Atomic+Habits",
        synopsis: "An easy and proven way to build good habits and break bad ones.",
        isSeries: false,
        stockStatus: "In Stock"
    }
];

export default dummyBooks;
