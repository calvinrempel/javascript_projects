export const GameColliderType = {
    CIRCLE: 'circle',
    RECT: 'rect'
}

export class GameCollider {
    constructor(type, collisionKey, gameObject, x, y, collidesWith) {
        this.type = type;
        this.collisionKey = collisionKey;
        this.gameObject = gameObject;
        this.x = x;
        this.y = y;
        this.collidesWith = collidesWith;
    }

    getPosition() {
        return {
            x: this.x + this.gameObject.x,
            y: this.y + this.gameObject.y
        };
    }
}

export class CircleCollider extends GameCollider {
    constructor(collisionKey, gameObject, x, y, radius, collidesWith) {
        super(GameColliderType.CIRCLE, collisionKey, gameObject, x, y, collidesWith);
        this.radius = radius;
    }
}

export class RectCollider extends GameCollider {
    constructor(collisionKey, gameObject, x, y, width, height, collidesWith) {
        super(GameColliderType.RECT, collisionKey, gameObject, x, y, collidesWith);
        this.width = width;
        this.height = height;
    }
}