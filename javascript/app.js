const movieListMain = document.getElementById("movielist")
const continueWatching = document.getElementById("continue-watching")
const movieListCont = document.getElementById("movie-list-container")
const movieThumbnail = document.getElementById("movie-thumbnail")
const movieListTitle = document.getElementById("movie-list-title")
const movieListInfoDiv = document.getElementById("movie-list-info")
const movieYear = document.getElementById("year-of-release")
const movieDuration = document.getElementById("movie-list-duration")
const nav = document.querySelector(".nav")
const toggleMenu = document.querySelector(".toggle_menu")
const closeMenu = document.querySelector(".close")
const accountData = document.querySelector(".account_data")
const accountUserPhoto = document.querySelector(".user_photo_nav_btn_header")
const closeAccount = document.querySelector(".account_close")



//getting movies

class Movies{

    async getMovies() {

        try {
                let result = await fetch("javascript/movies.json");
                let movies = await result.json();
                return movies.popular;
        }

        catch(error) {
            console.log(error);
        }
    }


    async getContinueWatchingMovies() {

        try {
                let result = await fetch("javascript/movies.json");
                let movies = await result.json();
                return movies.continueWatching;
        }

        catch(error) {
            console.log(error);
        }
    }
    
}


class UI{

    displayMovie(movies) {

        let result = " ";

        movies.forEach(movie => {
            
            result += `
            
                <div class="movie_list_container" id="${movie.id}">

                    <img class="movie_thumbnail" id="movie-thumbnail" src="${movie.img}" alt="Avatar">

                    <p class="movie_list_title" id="movie-list-title">${movie.title}</p>

                    <div class="movie_list_info" id="movie-list-info">
                        <p class="year_of_release" id="year-of-release">${movie.year}</p>
                        <p class="movie_list_duration" id="movie-list-duration">${movie.duration}</p>
                    </div>

                </div>
            
            `
            movieListMain.innerHTML = result;

        });
    }

    displayContinueWatching(movies) {
        let result = " ";

        movies.forEach(movie => {
            
            result += `
            
                <div class="movie_list_container" id="${movie.id}">

                    <img class="movie_thumbnail" id="movie-thumbnail" src="${movie.img}" alt="Avatar">

                    <p class="movie_list_title" id="movie-list-title">${movie.title}</p>

                    <div class="movie_list_info" id="movie-list-info">
                        <p class="year_of_release" id="year-of-release">${movie.year}</p>
                        <p class="movie_list_duration" id="movie-list-duration">${movie.duration}</p>
                    </div>

                </div>
            
            `
            continueWatching.innerHTML = result;

        });
    }

}


class Storage{

    static saveMovies(movies) {
        localStorage.setItem("movies", JSON.stringify(movies))
    }

    static saveContinueWatching(movies) {
        localStorage.setItem("continue watching", JSON.stringify(movies))
    }


}

//open menu

if (toggleMenu) {
    toggleMenu.addEventListener('click', function() {
        nav.classList.add('show_nav')
    })
}


//close menu

if (closeMenu) {
    closeMenu.addEventListener("click", function () {
        nav.classList.remove('show_nav')
    })
}


//open account menu

if (accountUserPhoto) {
    accountUserPhoto.addEventListener("click", function() {
        accountData.classList.add('show_nav')
    })
}


//close account menu

if (closeAccount) {
    closeAccount.addEventListener("click", function() {
        accountData.classList.remove('show_nav')
    })
}




document.addEventListener("DOMContentLoaded", () => {

    const moviesList = new Movies();
    const ui = new UI();

    //get popular movies

    moviesList.getMovies()
    .then((movies)=> {

        ui.displayMovie(movies);

        Storage.saveMovies(movies);

    });

    //get continue watching movies

    moviesList.getContinueWatchingMovies()
    .then((movies)=> {

        ui.displayContinueWatching(movies);
       
        Storage.saveContinueWatching(movies);
    });

})