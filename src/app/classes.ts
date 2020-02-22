class Point {
    pointID: string;
    x: number;
    y: number;

    constructor(id: string, x: number, y: number) {
        this.pointID = id;
        this.x = x;
        this.y = y;
    }
}

class Annotation {
    annotationID: string;
    upperLeft: Point;
    lowerRight: Point;
    type: string;

    constructor(id: string, p1: Point, p2: Point, type: string) {
        this.annotationID = id;
        this.upperLeft = p1;
        this.lowerRight = p1;
    }
}

export {
    Point,
    Annotation
}

