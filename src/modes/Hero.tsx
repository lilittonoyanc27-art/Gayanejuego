import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Beast, Human, Lights, Scene, bx, vc, MAT } from '../three/world';
import { Plant } from '../three/ShopScene';
import { merge } from '../three/goods';
function Rig() { const { camera, pointer, size } = useThree(), v = useMemo(() => new THREE.Vector3(), []), l = useRef(new THREE.Vector3()); useFrame(() => { const port = size.width < 800; v.set((port ? 1.1 : 0.1) + pointer.x * 0.25, 0.95 + pointer.y * 0.1, port ? 3.6 : 2.75); camera.position.lerp(v, 0.04); l.current.set(port ? 1.1 : 0.18, port ? 0.45 : 0.6, 0); camera.lookAt(l.current); }); return null; }
export default function Hero() {
  const g = useMemo(() => merge([bx(14, 4, 0.1, 0, 2, -2.2, '#f2d8e2'), bx(14, 0.16, 0.06, 0, 0.08, -2.13, '#fff7f3'), bx(1.5, 0.28, 0.8, 1.95, 0.14, -0.7, '#caa1b7'), bx(1.5, 0.08, 0.8, 1.95, 0.32, -0.7, '#f3dde6'), ...[-3, -1, 1, 3].map((x) => bx(0.05, 2.6, 0.03, x * 1.3, 2, -2.14, '#f8e8ee'))]), []);
  return <Scene className="heroscene" cam={[0.6, 1, 3.6]} fov={40} fog={false} bg="#f2d8e2"><Lights area={3.5} sun={[2.5, 4, 3.5]} intensity={2} every /><pointLight position={[3, 1.6, 1.2]} intensity={4} color="#ffd0b0" distance={5} /><Rig />
    <mesh rotation-x={-Math.PI / 2} receiveShadow><planeGeometry args={[16, 12]} /><meshPhysicalMaterial color="#ead2c6" roughness={0.3} clearcoat={0.5} /></mesh><mesh geometry={g} material={vc} receiveShadow castShadow /><Plant position={[3.1, 0, -1.4]} s={1.3} /><mesh position={[0.9, 2.1, -2.1]} material={MAT.glow}><ringGeometry args={[0.62, 0.66, 64]} /></mesh>
    <Human id="gayane" position={[1.12, 0, -0.4]} rotation={-0.1} /><Beast id="golden" position={[0.62, 0, 0.35]} rotation={0.3} mood="happy" shells={16} /><Beast id="siames" position={[1.75, 0.36, -0.55]} rotation={-0.3} shells={14} /><Beast id="conejoblanco" position={[1.35, 0, 0.65]} rotation={-0.5} shells={14} /><Beast id="loro" position={[2.35, 0.36, -0.6]} rotation={-0.5} shells={12} /></Scene>;
}
