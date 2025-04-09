# 🎬 Movie Dunia

**Movie Dunia** is a modern and responsive movie discovery web application built with **React**. It allows users to search for movies from **OMDB** and **TMDB**, rate them using a custom star component, view trailers, and maintain a personal watchlist — all in a clean, minimal, CSS-powered UI.

---

## 🚀 Features

- 🔍 **Movie Search** with dynamic suggestions from **OMDB** and **TMDB** databases  
- ⭐ **Interactive Star Rating System** — reusable and customizable  
- 📋 **Watchlist Support** — track “Watched” and “Currently Watching” movies  
- 🎥 **Integrated Trailer Preview** using embedded YouTube players  
- 🧾 **IMDB & User Ratings** displayed with visual clarity  
- 📱 **Responsive Layout** — adapts to mobile, tablet, and desktop  
- 🎨 **Modern UI** — built entirely with **CSS**, no Tailwind or external frameworks  

---

## 📁 Project Structure

```
.
├── public/
├── src/
│   ├── App.js           # Main application component
│   ├── StarRating.js    # Reusable star rating component
│   ├── index.js         # React entry point
│   ├── index.css        # Global styles and responsive layout
│   └── components/      # (Optional) Reusable UI components
└── README.md
```

---

## 🛠 Technologies Used

- ⚛️ React 18+
- 🎨 Pure CSS (No Tailwind or frameworks)
- 💡 Responsive Grid & Flexbox Layout
- 🌈 CSS Variables for theming
- ⭐ SVG Icons for rating system

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/SahilShaw2004/MovieDunia.git
cd MovieDunia
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file in the root directory and add your API keys:

```env
REACT_APP_OMDB_API_KEY=your_omdb_api_key
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
```

### 4. Start the development server

```bash
npm start
```

---

## 🔐 API Keys

This application uses two movie APIs:

### 1. [OMDB API](https://www.omdbapi.com/)
- Sign up for a free API key
- Add it to your `.env` as:
  ```
  REACT_APP_OMDB_API_KEY=your_omdb_api_key
  ```

### 2. [TMDB API](https://www.themoviedb.org/)
- Create a free TMDB account to generate an API key
- Add it to your `.env` as:
  ```
  REACT_APP_TMDB_API_KEY=your_tmdb_api_key
  ```

---

## 🔐 Security Note

**Never commit your `.env` file** to version control. This project’s `.gitignore` already ignores it for you.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
The project is beginner-friendly and designed for small to mid-size deployments.

> You don’t need to eject. The built-in features are fully customizable without it.

---

## 🧩 Customization

- 🔧 Easily swap OMDB/TMDB with other APIs (e.g., RapidAPI, FilmAffinity)
- 🎨 Customize the `StarRating` component: size, color, messages, etc.
- 📦 Extend watchlist support to persistent backend (Firebase, Supabase, MongoDB, etc.)

---

## 🧠 Credits

Created with ❤️ by **[Sahil Shaw]**  
Inspired by modern platforms like **IMDB**, **TMDB**, and **Letterboxd**

---

## 📃 License

This project is licensed under the **MIT License**.  
Feel free to use, share, and enhance it for your own projects!

---
