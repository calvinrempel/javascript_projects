import { GameColliderType } from "./game-collider.js";

export class GameCollisionChecker {
    constructor() {
        this.circleCircle = new CircleCircleCollider();
        this.circleRectCollider = new CircleRectCollider();
        this.rectRectCollider = new RectRectCollider();

        this.colliders = {};
    }

    addCollider(collider) {
        if (this.colliders[collider.collisionKey]) {
            this.colliders[collider.collisionKey].push(collider);
        } else {
            this.colliders[collider.collisionKey] = [collider];
        }
    }

    removeCollider(collider) {
        if (this.colliders[collider.collisionKey]) {
            const idx = this.colliders[collider.collisionKey].indexOf(collider);
            if (idx >= 0) {
                this.colliders[collider.collisionKey].splice(idx, 1);
            }
        }
    }

    findCollisions() {
        const collisions = [];
        Object.values(this.colliders).forEach(colliderGroup => {
            colliderGroup.forEach(collider => {
                collider.collidesWith.forEach(otherGroupKey => {
                    if (this.colliders[otherGroupKey]) {
                        this.colliders[otherGroupKey].forEach(otherCollider => {
                            if (this.doCollide(collider, otherCollider)) {
                                collisions.push([ collider.gameObject, otherCollider.gameObject ])
                            }
                        });
                    }
                });
            });
        });

        collisions.forEach(collision => {
            collision[0].onCollision(collision[1]);
        });
    }

    doCollide(collider, otherCollider) {
        const type1 = collider.type;
        const type2 = otherCollider.type;

        if (type1 === GameColliderType.CIRCLE) {
            if (type2 === GameColliderType.CIRCLE) {
                return this.circleCircle.collides(collider, otherCollider);
            } else if (type2 === GameColliderType.RECT) {
                return this.circleRectCollider.collides(collider, otherCollider);
            }
        } else if (type1 === GameColliderType.RECT) {
            if (type2 === GameColliderType.CIRCLE) {
                return this.circleRectCollider.collides(otherCollider, collider);
            } else if (type2 === GameColliderType.RECT) {
                return this.rectRectCollider.collides(collider, otherCollider);
            }
        }

        return false;
    }
}

class ShapeCollider {
    collides(c1, c2) { return false; }
}

class CircleCircleCollider extends ShapeCollider {
    collides(c1, c2) {
        const p1 = c1.getPosition();
        const r1 = c1.radius;

        const p2 = c2.getPosition();
        const r2 = c2.radius;

        const d = Math.sqrt( Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2) )
        if (d <= r1 + r2) {
            return true;
        }
        return false;
    }
}

class RectRectCollider extends ShapeCollider {
    collides(r1, r2) {
        const p1 = r1.getPosition();
        const bbox1 = {
            x1: p1.x,
            y1: p1.y,
            x2: p1.x + r1.width,
            y2: p1.y + r1.height
        }

        const p2 = r2.getPosition();
        const bbox2 = {
            x1: p2.x,
            y1: p2.y,
            x2: p2.x + r2.width,
            y2: p2.y + r2.height
        }

        const noOverlap =
            bbox1.x1 > bbox2.x2 ||
            bbox1.x2 < bbox2.x1 ||
            bbox1.y1 > bbox2.y2 ||
            bbox1.y2 < bbox2.y1;
        return !noOverlap;
    }
}

class CircleRectCollider extends ShapeCollider {
    collides(c, r) {
        const cP = c.getPosition();
        const cR = c.radius;

        const rP = r.getPosition();
        const bbox = {
            x1: rP.x,
            y1: rP.y,
            x2: rP.x + r.width,
            y2: rP.y + r.height
        }

        const xN = Math.max(bbox.x1, Math.min(cP.x, bbox.x2));
        const yN = Math.max(bbox.y1, Math.min(cP.y, bbox.y2));

        const dX = xN - cP.x;
        const dY = yN - cP.y;

        return (dX * dX + dY * dY) <= cR * cR;
    }
}