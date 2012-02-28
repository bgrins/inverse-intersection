# Inverse Intersection

Given a parent rectangle and a collection of children rectangles on a 2D plane, how do you find a collection of non-overlapping rectangles that cover the inverse of the original set?


Given the container rectangle along with the set `[A, B]` -> we want an output similar to `[1, 2, 3, 4, 5]`.

             +----------------------------------------------------------------+
             |                                                                |
             |                                                                |
             |       +------------------+        +--------------------+       |
             |       |                  |        |                    |       |
             |       |                  |        |                    |       |
             |       |        A         |        |        B           |       |
             |       |                  |        |                    |       |
             |       |                  |        |                    |       |
             |       |                  |        |                    |       |
             |       +------------------+        +--------------------+       |
             |                                                                |
             |                                                                |
             |                                                                |
             |                                                                |
             |                                                                |
             +----------------------------------------------------------------+


             +----------------------------------------------------------------+
             |                                                                |
             |                               1                                |
             +-------+------------------+--------+--------------------+-------+
             |       |                  |        |                    |       |
             |       |                  |        |                    |       |
             |   2   |                  |   3    |                    |       |
             |       |                  |        |                    |   4   |
             |       |                  |        |                    |       |
             |       |                  |        |                    |       |
             +-------+------------------+--------+--------------------+-------+
             |                                                                |
             |                                                                |
             |                              5                                 |
             |                                                                |
             |                                                                |
             +----------------------------------------------------------------+
             
             
## Usage
Try this out for size:

    var parentRectangles = {top:0, left:0, width: 100, height: 100 };
    var childRectangles = [{top:10, left:10, width: 10, height: 10 }, {top:80, left:80, width: 10, height: 10 }];
    
    var inverses = inverseIntersection(parentRectangle, childRectangles);
    
    /*
    [
        {"left":0,"top":0,"width":100,"height":10},
        {"left":0,"top":20,"width":100,"height":60},
        {"left":0,"top":90,"width":100,"height":10},
        {"left":0,"top":80,"width":80,"height":10},
        {"left":90,"top":80,"width":10,"height":10},
        {"left":0,"top":10,"width":10,"height":10},
        {"left":20,"top":10,"width":80,"height":10}
    ]
    */