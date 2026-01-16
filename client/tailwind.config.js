/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#4c1d95', // violet-900
                    secondary: '#a21caf', // fuchsia-700
                    light: '#f5f3ff', // violet-50
                    dark: '#2e1065', // violet-950
                    gold: '#d97706', // amber-600 (for Vault)
                }
            },
            fontFamily: {
                serif: ['Merriweather', 'serif'], // You might want to import this font in index.css
                sans: ['Geist', '"Geist Fallback"', 'Arial', 'Helvetica', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
