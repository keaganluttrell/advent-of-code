class Base {
  protected name: string;
  protected type: string;
  constructor(name: string, type: "f" | "d") {
    this.name = name;
    this.type = type;
  }
  getName() {
    return this.name;
  }

  getType() {
    return this.type;
  }
}

interface Contract {
  getName: Function;
  getType: Function;
  getSize: Function;
  print: Function;
}

export class FileNode extends Base implements Contract {
  private size: number;

  constructor(name: string, size: number) {
    super(name, "f");
    this.size = size;
  }

  getSize(): number {
    return this.size;
  }

  print(depth: number = 0) {
    console.log(
      "|" +
        "_".repeat(depth) +
        `${this.getType().toUpperCase()}: ${this.getName()} S: ${this.getSize()}`
    );
  }
}

export class DirNode extends Base implements Contract {
  private children: Record<string, Base> = {};
  private parent: DirNode | undefined;
  constructor(name, parent: DirNode | undefined = undefined) {
    super(name, "d");
    this.parent = parent;
  }

  getSize(): number {
    let size: number = 0;
    for (const child of Object.values(this.children)) {
      if (child.getType() === "f") {
        size += (child as FileNode).getSize();
      } else {
        size += (child as DirNode).getSize();
      }
    }
    return size;
  }

  getChildren(): Base[] {
    return Object.values(this.children);
  }

  getParent(): DirNode {
    if (this.parent === undefined) {
      return this;
    }
    return this.parent;
  }

  addChild(node: Base) {
    const childName = node.getName();
    if (this.children[childName]) {
      throw new Error(childName + " already exists");
    }
    this.children[childName] = node;
  }

  getDir(name): DirNode {
    const child = this.children[name];
    if (child === undefined) {
      throw new Error("No such directory: " + name);
    }
    if (child.getType() !== "d") {
      throw new Error(name + " is not a directory");
    }
    return child as DirNode;
  }

  print(depth: number = 0) {
    console.log(
      "|" +
        "_".repeat(depth) +
        `${this.getType().toUpperCase()}: ${this.getName()} S: ${this.getSize()}`
    );
    for (const child of Object.values(this.children)) {
      (child as FileNode | DirNode).print(depth + 1);
    }
  }
}

export class FS {
  private root: DirNode;
  private wd: DirNode;
  private maxDirSize = 100000;
  private totalSpace = 70000000;
  private spaceNeeded = 30000000;
  constructor(root = "/") {
    this.root = new DirNode(root);
    this.wd = this.root;
  }

  cd(dirName: string) {
    if (dirName === "..") {
      this.wd = this.wd.getParent();
    } else if (dirName === "/") {
      this.wd = this.root;
    } else {
      this.wd = this.wd.getDir(dirName);
    }
  }

  ls() {
    this.wd.print();
  }

  printFs() {
    this.root.print();
  }

  mkdir(dirName) {
    const dir: DirNode = new DirNode(dirName, this.wd);
    this.wd.addChild(dir);
  }

  touch(fileName: string, size: number) {
    const file: FileNode = new FileNode(fileName, size);
    this.wd.addChild(file);
  }

  searchForMaxSizeDirs() {
    const sum = this.dfs(this.root);
    console.log(sum);
  }

  dfs(dirNode: DirNode) {
    let sum = 0;
    for (const xchild of dirNode.getChildren()) {
      const child = xchild as DirNode | FileNode;
      if (child.getType() === "d") {
        if (child.getSize() < this.maxDirSize) {
          sum += child.getSize();
          console.log("D", child.getName(), child.getSize());
        }
        sum += this.dfs(child as DirNode);
      }
    }
    return sum;
  }

  dfs2(
    dirNode: DirNode,
    targetSize: number,
    closestNode: DirNode = this.root
  ): DirNode {
    if (
      dirNode.getSize() > targetSize &&
      dirNode.getSize() < closestNode.getSize()
    ) {
      closestNode = dirNode;
    }
    for (const child of dirNode.getChildren()) {
      if (child.getType() === "d") {
        closestNode = this.dfs2(child as DirNode, targetSize, closestNode);
      }
    }
    return closestNode;
  }

  findSmallestDirectoryGreaterThanTargetSize(): number {
    const targetSize = this.getSpaceNeeded();
    return this.dfs2(this.root, targetSize, this.root).getSize();
  }

  getSpaceUsed(): number {
    return this.root.getSize();
  }
  getFreeSpace() {
    return this.totalSpace - this.root.getSize();
  }
  getSpaceNeeded() {
    return this.spaceNeeded - this.getFreeSpace();
  }
}
