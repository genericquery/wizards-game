export abstract class AbstractControlStrategy {
  abstract moveX(): void;

  abstract moveY(): void;

  abstract attack(): void;

  abstract protect(): void;

  abstract capture(): void;
}
