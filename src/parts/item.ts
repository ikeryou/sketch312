import { MyObject3D } from "../webgl/myObject3D";
import { Mesh } from 'three/src/objects/Mesh';
import { LineSegments } from 'three/src/objects/LineSegments';
import { Util } from "../libs/util";
import { BoxGeometry } from 'three/src/geometries/BoxGeometry';
// import { SphereGeometry } from 'three/src/geometries/SphereGeometry';
import { EdgesGeometry } from 'three/src/geometries/EdgesGeometry';
import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry';
import { Vector3 } from 'three/src/math/Vector3';
import { DoubleSide } from 'three/src/constants';
import { Conf } from '../core/conf';
import { MeshPhongMaterial } from 'three/src/materials/MeshPhongMaterial';
import { LineBasicMaterial } from 'three/src/materials/LineBasicMaterial';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';

export class Item extends MyObject3D {

  private _itemId:number;
  private _mesh:Mesh;
  private _bg:LineSegments;
  private _bg2:Mesh;

  public itemSize:Vector3 = new Vector3(300, 300, 0)
  public blockSize:Vector3 = new Vector3(30, 30, 0)

  constructor(opt:any = {}) {
    super()

    this._itemId = opt.id;
    this._c = opt.id * 10;

    const isLast = this._itemId == Conf.instance.ITEM_NUM - 1;
    const lineGeo = new EdgesGeometry(new PlaneGeometry(1, 1))

    this._bg = new LineSegments(
      lineGeo,
      new LineBasicMaterial({
        color:0x000000,
        transparent:true,
        depthTest:false,
        side:DoubleSide,
      })
    )
    this.add(this._bg);

    this._bg2 = new Mesh(
      new PlaneGeometry(1, 1),
      new MeshBasicMaterial({
        color: isLast ? 0x000000 : Util.instance.randomArr(Conf.instance.COLOR),
        transparent:true,
        depthTest:false,
        side:DoubleSide,
      })
    )
    this.add(this._bg2);

    this._mesh = new Mesh(
      new BoxGeometry(1, 1, 1),
      // new SphereGeometry(0.5, 8, 8),
      new MeshPhongMaterial({
        color:Util.instance.randomArr(Conf.instance.COLOR),
        emissive:Util.instance.randomArr(Conf.instance.COLOR),
        transparent:true,
        depthTest:false,
        side:DoubleSide,
      })
    )
    this.add(this._mesh);
  }





  protected _update():void {
    super._update();

    const rate = (this._c % 100) / 100;

    const s = this.blockSize.x * 0.5 * 1;
    this._mesh.scale.set(s, s, s);

    const bgSize = this.itemSize.x;
    this._bg.scale.set(bgSize, bgSize, 1)

    const bg2Size = (bgSize - s * 2);
    this._bg2.scale.set(bg2Size, bg2Size, 1)

    const area = bgSize - s;
    if(rate < 0.25) {
      this._mesh.position.x = Util.instance.map(rate, -area * 0.5, area * 0.5, 0, 0.25);
      this._mesh.position.y = -area * 0.5;
      this._mesh.rotation.x = 0;
      this._mesh.rotation.y = Util.instance.radian(Util.instance.map(rate, 0, 90, 0, 0.25));
    }

    if(rate >= 0.25 && rate < 0.5) {
      this._mesh.position.x = area * 0.5;
      this._mesh.position.y = Util.instance.map(rate, -area * 0.5, area * 0.5, 0.25, 0.5);
      this._mesh.rotation.x = Util.instance.radian(Util.instance.map(rate, 90, 0, 0.25, 0.5));
      this._mesh.rotation.y = 0;
    }

    if(rate >= 0.5 && rate < 0.75) {
      this._mesh.position.x = Util.instance.map(rate, area * 0.5, -area * 0.5, 0.5, 0.75);
      this._mesh.position.y = area * 0.5;
      this._mesh.rotation.x = 0;
      this._mesh.rotation.y = Util.instance.radian(Util.instance.map(rate, 90, 0, 0.5, 0.75));
    }

    if(rate >= 0.75 && rate < 1) {
      this._mesh.position.x = -area * 0.5
      this._mesh.position.y = Util.instance.map(rate, area * 0.5, -area * 0.5, 0.75, 1);
      this._mesh.rotation.x = Util.instance.radian(Util.instance.map(rate, 0, 90, 0.75, 1));
      this._mesh.rotation.y = 0;
    }

    if(this._itemId % 2 == 0) {
      this._mesh.position.x *= -1;
      // this._mesh.position.y *= -1;
    }

    // this._mesh.rotation.x = 0;
    // this._mesh.rotation.x = 0;

    // this.rotation.z = this._c * 0.01;
    // this._bg2.rotation.z = this._mesh.rotation.x * -1;
    // this._bg.rotation.y = this._mesh.rotation.y * -1;
  }


  protected _resize(): void {
    super._resize();
  }
}