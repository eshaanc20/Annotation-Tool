// handles points of a rectangle on the canvas
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

// handles an Annotation
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

// handles multiple annotations for an image
class Annotations {
    // name of image
    imageName: string;
    // array of Annotation objects
    annotations: Array<Annotation>;

    constructor(name: string) {
        this.imageName = name;
        this.annotations = [];
    }

    // method for adding a new Annotation object to the array of Annotation objects for this image
    add(annotation: Annotation) {
        this.annotations.push(annotation);
    }
}

// exports all classes to be used in app.component.ts
export {
    Point,
    Annotation,
    Annotations
};

