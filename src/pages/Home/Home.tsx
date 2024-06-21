/////////////////////////////////////
// IMPORTING MODULES
/////////////////////////////////////
//"homepage": "http://npx2218.github.io/double-pendulum/",

import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import LocomotiveScroll from "locomotive-scroll";
import Boids from "../../components/Boids/Boids";
var Latex = require("react-latex");

/////////////////////////////////////
// INTERFACE: PROPS
/////////////////////////////////////

interface Props {
  scroll?: LocomotiveScroll | null;
}

/////////////////////////////////////
// COMPONENT: HOME
/////////////////////////////////////

const Home = ({ scroll }: Props) => {
  return (
    <div data-scroll-container className="overflow-x-hidden">
      <div className="flex flex-col items-center py-12 bg-black">
        <div className="flex flex-col items-center self-stretch px-20 mt-1.5 w-full max-md:px-5 max-md:max-w-full">
          <Navbar scroll={scroll} />
        </div>
        <br />
        <br />
        <div className="text-white text-md px-auto min-[1300px]:max-w-6xl max-w-xs sm:max-w-xl min-[600px]:max-w-sm min-[1043px]:max-w-4xl min-[800px]:max-w-2xl">
          <section id="introduction">
            <h2 className="text-white text-2xl font-bold pb-2">Introduction</h2>
            <p>
              Boids are an artificial representation of birds, and their
              behaviour can be modeled using Craig Reynold's algorithm. Within
              this algorithm there are three main rules that birds are assumed
              to follow:
              <ul className="list-decimal list-inside pl-10 pt-4">
                <li>
                  <b>Seperation</b>: Each of these birds mantain a reasonable
                  distance within each other inorder to not collide as well as
                  prevent overcrowding
                </li>
                <li>
                  <b>Alignment</b>: Birds try to follow the average alignment of
                  their flockmates to "fit in"
                </li>
                <li>
                  <b>Cohesion</b>: They also try to steer themselves to fit
                  within flocks that come close to them
                </li>
              </ul>
              <br />
              The original visualiation of this algorithm was created in 1986,
              and can be seen here:
            </p>
          </section>
          <br />
          <div className="w-full h-full flex items-center justify-center">
            <iframe
              className="rounded-3xl  "
              width="560"
              height="315"
              src="https://www.youtube.com/embed/86iQiV3-3IA?si=Abk9is7rnc0WuYXO"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <br />
          <br />
          <section id="psuedo-code">
            <h2 className="text-white text-2xl font-bold pb-2">
              Psuedo-code of algorithm
            </h2>
            <pre className="code-snippet text-white p-4 rounded-lg overflow-auto w-full whitespace-pre-wrap">{`
VISUAL_RANGE = 10
            
boids = Array<Boid> [OR] [{
  x: random.x,
  y: random.y,
  dx: random.dx,
  dy: random.dy,
  history: Array,
}, ...]


function distanceFormula = (boid1, boid2) =>  sqrt((boid1.x - boid2.x) ** 2 + (boid1.y - boid2.y) ** 2);
function flyTowardsCenter = (boid) => {
  totalX = 0
  totalY = 0
  totalNeighbors = 0
  CENTERING_FACTOR = 0.01
  loop for each otherBoid in boids {
    if (boid == otherBoid) return;
      if distanceFormula(boid, otherBoid) < VISUAL_RANGE {
        totalX = otherBoid.x;
        totalY = otherBoid.y;
        totalNeighbors += 1;
      }
  }
    if (totalNeighbors > 0) {
      totalX = totalX/totalNeighbors;
      totalY = totalY/totalNeighbors;
      
      // This line essentially takes the average x-coordinates of the neighbours
      // then it subtracts that from the current boids position and multitplies it by the factor
      // This will help the boid move towards its neighbours
      
      boid.dx += (totalX - boid.x) * CENTERING_FACTOR;
      boid.dy += (totalY - boid.y) * CENTERING_FACTOR;
    }
}
function avoidOtherBoids = (boid) => {
  MIN_DISTANCE = 20
  avoid_factor = 0.05

  moveX = 0
  moveY = 0
              
  loop for each otherBoid in boids {
      if boid != otherBoid && distanceFormula(boid, otherBoid) < MIN_DISTANCE {
        moveX += boid.x - otherBoid.x;
        moveY += boid.y - otherBoid.y;
      }

      boid.dx += moveX * avoidFactor;
      boid.dy += moveY * avoidFactor;

    }
}

function matchVelocity = (boid) => {
  matchingFactor = 0.05
  totalDx = 0
  totalDy = 0
  numNeighbours = 0
  loop for each otherBoid in boids {
      if boid !== otherBoid && distanceFormula(boid, otherBoid) < VISUAL_RANGE {
         totalDx += otherBoid.dx
         totalDy += otherBoid.dy
         numNeighbours += 1
      }
    } 

    if numNeighbours > 0 {
      boid.dx += totalDx / numNeighbours * matchingFactor 
      boid.dy += totalDy / numNeighbours * matchingFactor
    }
}
            `}</pre>
            <p>
              The rest of the program is mainly visuals, and can be found linked
              later on in this website. Most of the understanding is needed for
              the three functions that Craig Reynold's suggested
            </p>
          </section>
          <br />
          <h2 className="text-white text-2xl font-bold pb-2">Visualizer</h2>
        </div>

        <section id="visualizer">
          <Boids scroll={scroll} />
        </section>

        <Footer />
      </div>
    </div>
  );
};

/////////////////////////////////////
// EXPORTING HOME
/////////////////////////////////////

export default Home;
