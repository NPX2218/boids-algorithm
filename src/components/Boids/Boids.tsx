/////////////////////////////////////
// IMPORTING LIBRARIES
/////////////////////////////////////

import React, { useEffect, useState, useRef, useCallback } from "react";
import Button from "../Button";
import { alertMessage } from "../Alert/Alert";
import { themeColor } from "../../theme";

/////////////////////////////////////
// COMPONENT: BOIDS
/////////////////////////////////////

const Boids = (): JSX.Element => {
  /////////////////////////////////////
  // SETTING STATES AND REFS
  /////////////////////////////////////
  const [drawTrail, setDrawTrail] = useState<boolean>(false);
  const [avoidOthersSetting, setAvoidOthersSetting] = useState<boolean>(true);
  const [flyTowardsCenterSetting, setFlyTowardsCenterSetting] =
    useState<boolean>(true);
  const [matchVelocitySetting, setMatchVelocitySetting] =
    useState<boolean>(true);
  const [numBoids, setNumBoids] = useState<number>(100);
  const [visualRange, setVisualRange] = useState<number>(75);
  const [speedLimit, setSpeedLimit] = useState<number>(15);
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const width = useRef<number>(150);
  const height = useRef<number>(150);
  const boids = useRef<any[]>([]);
  const lastFrameTime = useRef<number>(0);

  const drawTrailRef = useRef(drawTrail);
  const avoidOthersSettingRef = useRef(avoidOthersSetting);
  const flyTowardsCenterSettingRef = useRef(flyTowardsCenterSetting);
  const matchVelocitySettingRef = useRef(matchVelocitySetting);

  /////////////////////////////////////
  // UPDATING REFS
  /////////////////////////////////////

  useEffect(() => {
    drawTrailRef.current = drawTrail;
  }, [drawTrail]);

  useEffect(() => {
    avoidOthersSettingRef.current = avoidOthersSetting;
  }, [avoidOthersSetting]);

  useEffect(() => {
    flyTowardsCenterSettingRef.current = flyTowardsCenterSetting;
  }, [flyTowardsCenterSetting]);

  useEffect(() => {
    matchVelocitySettingRef.current = matchVelocitySetting;
  }, [matchVelocitySetting]);

  /////////////////////////////////////
  // CALLBACKS: DISTANCE
  /////////////////////////////////////

  const distance = useCallback(
    (boid1, boid2) =>
      Math.sqrt((boid1.x - boid2.x) ** 2 + (boid1.y - boid2.y) ** 2),
    []
  );

  /////////////////////////////////////
  // CALLBACKS: SIZE CANVAS
  /////////////////////////////////////

  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      width.current = window.innerWidth;
      height.current = window.innerHeight;
      canvas.width = width.current;
      canvas.height = height.current;
    }
  }, []);

  /////////////////////////////////////
  // CALLBACKS: KEEP WITHIN BOUNDS
  /////////////////////////////////////

  const keepWithinBounds = useCallback((boid) => {
    const margin = 200;
    const turnFactor = 1;

    if (boid.x < margin) boid.dx += turnFactor;
    if (boid.x > width.current - margin) boid.dx -= turnFactor;
    if (boid.y < margin) boid.dy += turnFactor;
    if (boid.y > height.current - margin) boid.dy -= turnFactor;
  }, []);

  /////////////////////////////////////
  // CALLBACKS: FLY TOWARDS CENTER
  /////////////////////////////////////

  const flyTowardsCenter = useCallback(
    (boid) => {
      if (!flyTowardsCenterSettingRef.current) return;
      const centeringFactor = 0.005;
      let centerX = 0;
      let centerY = 0;
      let numNeighbors = 0;

      boids.current.forEach((otherBoid) => {
        if (distance(boid, otherBoid) < visualRange) {
          centerX += otherBoid.x;
          centerY += otherBoid.y;
          numNeighbors += 1;
        }
      });

      if (numNeighbors) {
        centerX /= numNeighbors;
        centerY /= numNeighbors;
        boid.dx += (centerX - boid.x) * centeringFactor;
        boid.dy += (centerY - boid.y) * centeringFactor;
      }
    },
    [distance, visualRange]
  );

  /////////////////////////////////////
  // CALLBACKS: AVOID OTHERS
  /////////////////////////////////////

  const avoidOthers = useCallback(
    (boid) => {
      if (!avoidOthersSettingRef.current) return;
      const minDistance = 20;
      const avoidFactor = 0.05;
      let moveX = 0;
      let moveY = 0;

      boids.current.forEach((otherBoid) => {
        if (otherBoid !== boid && distance(boid, otherBoid) < minDistance) {
          moveX += boid.x - otherBoid.x;
          moveY += boid.y - otherBoid.y;
        }
      });

      boid.dx += moveX * avoidFactor;
      boid.dy += moveY * avoidFactor;
    },
    [distance]
  );

  /////////////////////////////////////
  // CALLBACKS: MATCH VELOCITY
  /////////////////////////////////////

  const matchVelocity = useCallback(
    (boid) => {
      if (!matchVelocitySettingRef.current) return;
      const matchingFactor = 0.05;
      let avgDX = 0;
      let avgDY = 0;
      let numNeighbors = 0;

      boids.current.forEach((otherBoid) => {
        if (distance(boid, otherBoid) < visualRange) {
          avgDX += otherBoid.dx;
          avgDY += otherBoid.dy;
          numNeighbors += 1;
        }
      });

      if (numNeighbors) {
        avgDX /= numNeighbors;
        avgDY /= numNeighbors;
        boid.dx += (avgDX - boid.dx) * matchingFactor;
        boid.dy += (avgDY - boid.dy) * matchingFactor;
      }
    },
    [distance, visualRange]
  );

  /////////////////////////////////////
  // CALLBACKS: LIMIT SPEED
  /////////////////////////////////////

  const limitSpeed = useCallback(
    (boid) => {
      const speed = Math.sqrt(boid.dx ** 2 + boid.dy ** 2);
      if (speed > speedLimit) {
        boid.dx = (boid.dx / speed) * speedLimit;
        boid.dy = (boid.dy / speed) * speedLimit;
      }
    },
    [speedLimit]
  );

  /////////////////////////////////////
  // CALLBACKS: DRAW BOID
  /////////////////////////////////////

  const drawBoid = useCallback((ctx, boid) => {
    const angle = Math.atan2(boid.dy, boid.dx);
    ctx.translate(boid.x, boid.y);
    ctx.rotate(angle);
    ctx.translate(-boid.x, -boid.y);
    ctx.fillStyle = "#1B5583";
    ctx.beginPath();
    ctx.moveTo(boid.x, boid.y);
    ctx.lineTo(boid.x - 15, boid.y + 5);
    ctx.lineTo(boid.x - 15, boid.y - 5);
    ctx.lineTo(boid.x, boid.y);
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    if (drawTrailRef.current) {
      ctx.strokeStyle = "#558cf466";
      ctx.beginPath();
      ctx.moveTo(boid.history[0][0], boid.history[0][1]);
      boid.history.forEach((point) => {
        ctx.lineTo(point[0], point[1]);
      });
      ctx.stroke();
    }
  }, []);

  /////////////////////////////////////
  // CALLBACKS: ANIMATION LOOP
  /////////////////////////////////////

  const animationLoop = useCallback(
    (timestamp) => {
      if (timestamp - lastFrameTime.current > 1000 / 60) {
        boids.current.forEach((boid) => {
          flyTowardsCenter(boid);
          avoidOthers(boid);
          matchVelocity(boid);
          limitSpeed(boid);
          keepWithinBounds(boid);
          boid.x += boid.dx;
          boid.y += boid.dy;
          boid.history.push([boid.x, boid.y]);
          boid.history = boid.history.slice(-50);
        });

        const canvas = canvasRef.current as any;
        if (!canvas) return;
        const ctx = canvas.getContext("2d") as any;
        ctx.clearRect(0, 0, width.current, height.current);
        boids.current.forEach((boid) => drawBoid(ctx, boid));

        lastFrameTime.current = timestamp;
      }
      window.requestAnimationFrame(animationLoop);
    },
    [
      flyTowardsCenter,
      avoidOthers,
      matchVelocity,
      limitSpeed,
      keepWithinBounds,
      drawBoid,
    ]
  );

  useEffect(() => {
    /////////////////////////////////////
    // FUNCTION: INIT BOIDS
    /////////////////////////////////////

    const initBoids = (): void => {
      boids.current = Array.from({ length: numBoids }, () => ({
        x: Math.random() * width.current,
        y: Math.random() * height.current,
        dx: Math.random() * 10 - 5,
        dy: Math.random() * 10 - 5,
        history: [],
      }));
    };

    window.addEventListener("resize", sizeCanvas, false);
    sizeCanvas();
    initBoids();
    window.requestAnimationFrame(animationLoop);

    return () => {
      window.removeEventListener("resize", sizeCanvas);
    };
  }, [animationLoop, numBoids, sizeCanvas]);

  /////////////////////////////////////
  // FUNCTION: HANDLE NUMBER BOIDS CHANGE
  /////////////////////////////////////

  const handleNumBoidsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = Number(e.target.value);
    if (value <= 200 && value >= 0) {
      setNumBoids(value);
    } else if ((value >= 200 || value < 0) && !alertShow) {
      alertMessage("Number of boids should be between 0 and 200", setAlertShow);
    } else if (!alertShow) {
      alertMessage("Type in a number!", setAlertShow);
    }
  };

  /////////////////////////////////////
  // FUNCTION: HANDLE VISUAL RANGE CHANGE
  /////////////////////////////////////

  const handleVisualRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = Number(e.target.value);
    if (value <= 150 && value >= 0) {
      setVisualRange(value);
    } else if ((value >= 150 || value < 0) && !alertShow) {
      alertMessage("Visual range should be between 0 and 150", setAlertShow);
    } else if (!alertShow) {
      alertMessage("Type in a number!", setAlertShow);
    }
  };

  /////////////////////////////////////
  // FUNCTION: HANDLE SPEED LIMIT CHANGE
  /////////////////////////////////////

  const handleSpeedLimitChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = Number(e.target.value);
    if (value <= 30 && value >= 5) {
      setSpeedLimit(value);
    } else if ((value >= 30 || value < 5) && !alertShow) {
      alertMessage("Speed should be between 5 and 30", setAlertShow);
    } else if (!alertShow) {
      alertMessage("Type in a number!", setAlertShow);
    }
  };

  return (
    <div className="text-white">
      <canvas ref={canvasRef} id="boids" width="150" height="150">
        Boids
      </canvas>

      <div className="flex flex-col justify-center items-center flex-wrap">
        <div className="flex flex-row flex-wrap items-center justify-center">
          <div className="flex flex-row">
            <Button
              onClick={() => setDrawTrail(!drawTrail)}
              text={(drawTrail ? "Disable" : "Enable") + " Trail Effect"}
            />
            <Button
              onClick={() => setAvoidOthersSetting(!avoidOthersSetting)}
              text={
                (avoidOthersSetting ? "Disable" : "Enable") + " Avoid Others"
              }
            />
          </div>
          <div className="flex flex-row">
            <Button
              onClick={() =>
                setFlyTowardsCenterSetting(!flyTowardsCenterSetting)
              }
              text={
                (flyTowardsCenterSetting ? "Disable" : "Enable") +
                " Fly Towards Center"
              }
            />
            <Button
              onClick={() => setMatchVelocitySetting(!matchVelocitySetting)}
              text={
                (matchVelocitySetting ? "Disable" : "Enable") +
                " Match Velocity"
              }
            />
          </div>
        </div>
        <br />
        <div className="space-y-5">
          <div>
            <label>
              Number of Boids (0-200):
              <input
                style={{ borderColor: themeColor }}
                className="text-white rounded-sm ml-5 border-2 bg-black p-2"
                defaultValue={numBoids}
                max="200"
                onChange={handleNumBoidsChange}
              />
            </label>
          </div>
          <div>
            <label>
              Visual Range (0-150):
              <input
                className="text-white rounded-sm ml-5 border-2 bg-black p-2"
                style={{ borderColor: themeColor }}
                defaultValue={visualRange}
                type="number"
                max="150"
                onChange={handleVisualRangeChange}
              />
            </label>
          </div>
          <div>
            <label>
              Speed Limit (5-30):
              <input
                type="text"
                className="text-white rounded-sm ml-5 border-2 bg-black p-2"
                style={{ borderColor: themeColor }}
                defaultValue={speedLimit}
                onChange={handleSpeedLimitChange}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

/////////////////////////////////////
// EXPORTING BOIDS
/////////////////////////////////////

export default Boids;
