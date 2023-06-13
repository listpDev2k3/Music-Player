import songs from "./data.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const headingSong = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBnt = $(".btn-toggle-play");
const player = $(".player");
const progress=$("#progress")
const app = {
    currentIndex: Math.floor(Math.random() * 5),
    isPlaying: false,
    render: function (songs) {
        $(".playlist").innerHTML = songs
            .map((song, index) => {
                return `
          <div class="song">
            <div class="thumb" style="background-image: url('${song.image}')"></div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
        `;
            })
            .join("");
    },

    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return songs[this.currentIndex];
            },
        });
    },

    handleEvents: function () {
        const getCd = $(".cd");
        const cdWidth = getCd.offsetWidth;
        const _this = this;
        // Sử lý phóng to, thu nhỏ Cd
        document.onscroll = function () {
            const newWidthCd = cdWidth - window.scrollY;
            getCd.style.width = newWidthCd > 0 ? `${newWidthCd}px` : 0;
            getCd.style.opacity = newWidthCd / cdWidth;
        };
        // Sử lý khi click play/pause
        playBnt.onclick = () => {
            if (!_this.isPlaying) {
                audio.play()
              
            }
            else {
                audio.pause()
                player.classList.remove("playing");
                _this.isPlaying = false;
            }
        }
        audio.onplay = () => {
            player.classList.add("playing");
            _this.isPlaying = true;
        }
        audio.onpause = () => {
            player.classList.remove("playing");
            _this.isPlaying = false;
        }
        // khi tiến độ bài hát thay đổi 
        audio.ontimeupdate = () => {
            const progressValue= (audio.currentTime/audio.duration)*100
            progress.value=Math.round(progressValue)
        }
        progress.onchange = (e) =>{
            const seekTime = (e.target.value*audio.duration)/100
            audio.currentTime=seekTime;
        }   

    },

    loadCurrentSong: function () {

        headingSong.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    start: function () {
        this.render(songs);
        this.defineProperties();
        this.loadCurrentSong();
        this.handleEvents();

    },
};
app.start()

