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
        this.lowerRight = p2;
        this.type = type;
    }
}

class Annotations {
    imageName: string;
    annotations: Array<Annotation> = [];

    constructor(name: string) {
        this.imageName = name;
    }

    add(annotation: Annotation) {
        this.annotations.push(annotation);
    }

    length() {
        return this.annotations.length;
    }
}

export {
    Point,
    Annotation,
    Annotations
}

