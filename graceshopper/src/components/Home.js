import Footer from './Footer'
import './Home.css'
import Carousel from 'react-bootstrap/Carousel'
import SwiperCarousel from './Swiper'
// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'

const Home = () => {
    return (
      <>
        <div >
          <h1 className="homeTitle"> Video Game Heaven! </h1>
          <p className="welcomeMessage"> Enjoy your journey into the unkownn</p>
        </div>

        <Carousel className="carousel">

        <Carousel.Item style={{ height: "50vh", overflow: "hidden"}}>
            <img
              className="d-block w-100"
              src="https://images.pushsquare.com/22cf7d8e0a66b/outriders-demo-start-times-whats-included-and-unlocks-guide-1.original.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Outriders</h3>
              <p>Experience intense shooting action in Outriders.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item style={{height: "50vh", overflow: "hidden"}}>
            <img
              className="d-block w-100"
              src="https://image.api.playstation.com/vulcan/img/rnd/202010/0723/vDLeyNzrJdGwabFlEo44GkEZ.png?w=5000&thumb=false"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Final Fantasy VII Remake</h3>
              <p>Immerse yourself in the city of Midgar like never before, with improved textures, lighting, and background environments</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item style={{height: "50vh", overflow: "hidden"}}>
            <img
              className="d-block w-100"
              src="https://www.ps4wallpapers.com/wp-content/uploads/2021/01/2021-01-24_600ceafb1913f_1126063.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Resident Evil Village</h3>
              <p>Experience survival horror like never before in Resident Evil Village.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item style={{height: "50vh", overflow: "hidden"}}>
            <img
              className="d-block w-100"
              src="https://image.api.playstation.com/vulcan/ap/rnd/202010/0911/IUHo6BeWCLACvasWb4hX8xfu.jpg?w=5000&thumb=false"
              alt="Fourth slide"
            />
            <Carousel.Caption>
              <h3>The Witcher 3: Wild Hunt</h3>
              <p>Employ magic and superhuman skills to forge your own path in The Witcher 3: Wild Hunt.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item style={{height: "50vh", overflow: "hidden"}}>
            <img
              className="d-block w-100"
              src="https://cdn.mos.cms.futurecdn.net/iNiU9epDmKD5WSerpTpL9h.jpg"
              alt="Fifth slide"
            />
            <Carousel.Caption>
              <h3>Assassin's Creed Valhalla</h3>
              <p>Lead epic Viking raids against Saxon troops and fortresses.</p>
            </Carousel.Caption>
          </Carousel.Item>

          
        </Carousel>
        
        
        <div className="container"> 
          <div className="row"> 
              <div className="newGames">
              <h3 className="upcomingGamesTitle"> Upcoming Games </h3>
        <div>
          <section className="upcomingGamesList">

            <div className="pokemon" id="gameGrid">
              <img className= "image" src="https://tnsmedia.imgix.net/2021/01/newpokemonsnapfi.png?auto=compress&fm=png&ixlib=php-3.3.0&s=7d47702a4c8291c2feeb25c180297e49"/>
              <div className="title"> Pokemon Snap </div>
              <div> Coming April 30, 2021 </div>
              <div className="description"> Seek out and take in-game photographs of Pokémon in their native environments as you research Pokémon alongside Professor Mirror.</div>
            </div>

            <div className="biomutant" id="gameGrid">
              <img className= "image" src="https://compass-ssl.xbox.com/assets/53/1c/531cfd20-22e9-434b-86eb-2ea61b5dd646.jpg?n=Biomutant_GLP-Page-Hero-1084_1920x1080.jpg"/>
              <div className="title"> Biomutant </div>
              <div> Coming May 25, 2021 </div>
              <div className="description"> A post-apocalyptic Wung-Fu fable with unique martial art styled combat system allowing you to mix melee, shooting, and mutant ability action. </div>
            </div>

            <div className="deathloop" id="gameGrid">
              <img className= "image" src="https://d2skuhm0vrry40.cloudfront.net/2020/articles/2020-08-18-15-11/-1597759887416.jpg/EG11/thumbnail/750x422/format/jpg/quality/60"/>
              <div className="title"> Deathloop </div>
              <div> Coming September 14, 2021  </div>
              <div className="description"> Play Colt as you search for a way to put an end to a timeloop trapping Blackreef while being hunted by the island’s inhabitants. </div>
            </div>

            <div className="returnal" id="gameGrid">
              <img className= "image" src="https://d2skuhm0vrry40.cloudfront.net/2021/articles/2021-01-28-15-13/ps5-exclusive-returnal-delayed-to-the-end-of-april-1611846790021.jpg/EG11/resize/1200x-1/ps5-exclusive-returnal-delayed-to-the-end-of-april-1611846790021.jpg"/>
              <div className="title"> Returnal </div>
              <div> Coming April 30, 2021  </div>
              <div className="description"> Play Selene (Anne Beyer), a space pilot armed with high-tech weapons, stranded on the alien planet Atropos, and stuck in a time loop. </div>
            </div>

            <div className="balan" id="gameGrid">
              <img className= "image" src="https://www.gamereactor.eu/media/59/_3185983b.png"/>
              <div className="title"> Solar Ash </div>
              <div> Coming 2021 </div>  
              <div className="description"> Find a vivid and highly stylized world filled with wild high-speed traversal, endearing characters, and massive enemy encounters. </div>
            </div>

            <div className="farcry" id="gameGrid">
              <img className= "image" src="https://cdn.mos.cms.futurecdn.net/NGRzCGaYuRd6vVWM7Na43A.jpg"/>
              <div className="title"> Far Cry 6 </div>
              <div> Coming Mid 2021  </div>
              <div className="description"> As dictator of Yara, Antón Castillo is intent on restoring his nation back to its former glory by any means, with his son, Diego, dutifully at his side.  </div>
            </div>

          </section>
        </div>
      </div>
    </div>
    </div>
    <Footer/>
    </>
    );
}

export default Home;