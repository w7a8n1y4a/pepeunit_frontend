import { ForceGraph3D } from 'react-force-graph';
import React, { useRef, useCallback, useState } from "react";
import SpriteText from "three-spritetext";


export default function ForceGraph(){

    function genRandomTree(N = 500, reverse = false) {
        return {
          nodes: [...Array(N)].map((_, i) => ({ id: i })),
          links: [...Array(N)]
            .map((_, i) => i)
            .filter((id) => id)
            .map((id) => ({
              [reverse ? 'target' : 'source']: id,
              [reverse ? 'source' : 'target']: Math.round(Math.random() * (id - 1)),
            })),
        }
      }
    
    const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
    const [displayHeight, setDisplayHeight] = useState(window.innerHeight);
    
    window.addEventListener('resize', () => {
        setDisplayWidth(window.innerWidth);
        setDisplayHeight(window.innerHeight);
    });
    
    const fgRef = useRef();
    const [state, setState] = useState({
      nodeSize: 4,
      linkWidth: 1,
      linkLength: 3,
      linkOpacity: 0.5,
      nodeColor: "#73b72b",
    });

    const updateState = (values) => {
        setState((prev) => ({
          ...prev,
          ...values,
        }));
      };

    const onLinkLengthChange = (value) => {
    updateState({ linkLength: Number(value) });
    const linkForce = fgRef.current.d3Force("link");
    linkForce.distance(() => Number(value));
    };

    const handleClick = useCallback(
        (node) => {
            // Aim at node from outside it
            const distance = 180;
            const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

            fgRef.current.cameraPosition(
            {
                x: node.x * distRatio,
                y: node.y * distRatio,
                z: node.z * distRatio,
            }, // new position
            node, // lookAt ({ x, y, z })
            3000 // ms transition duration
            );
        },
        [fgRef]
    );
    
    const tooltipText = node => {
    return `<div class="chart-tooltip" style="background-color: ${state.nodeColor};"><b>Name:</b> ${node.id}</div>`;
    };

    return (
    <ForceGraph3D
        width={displayWidth}
        height={displayHeight}
        graphData={genRandomTree()}
        nodeRelSize={state.nodeSize}
        linkWidth={state.linkWidth}
        nodeLabel={tooltipText}
        linkOpacity={state.linkOpacity}
        dagLevelDistance={state.linkLength}
        onNodeClick={handleClick}
        nodeColor={function () {
        return state.nodeColor;
        }}
        linkThreeObjectExtend={true}
        nodeOpacity={8}
        linkThreeObject={(link) => {
            // extend link with text sprite
            const sprite = new SpriteText("");
            sprite.color = "lightgrey";
            sprite.textHeight = 5;
            return sprite;
        }}
        linkPositionUpdate={(sprite, { start, end }) => {
        const middlePos = Object.assign(
            ...["x", "y", "z"].map((c) => ({
            [c]: start[c] + (end[c] - start[c]) / 2, // calc middle point
            }))
        );
        Object.assign(sprite.position, middlePos);
        }}
    />
    
    )
}
