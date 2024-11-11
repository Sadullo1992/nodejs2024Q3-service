import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DatabaseService<T> {
  private dbMap = new Map<string, T>();

  create(dto: Omit<T, 'id'>) {
    const id = uuidv4();

    const obj = { id, ...dto } as unknown as T;

    this.dbMap.set(id, obj);

    return obj;
  }

  findAll() {
    return [...this.dbMap.values()];
  }

  findOne(id: string) {
    return this.dbMap.get(id);
  }

  update(id: string, dto: Partial<T>) {
    const obj = {
      ...this.dbMap.get(id),
      ...dto,
    };

    return this.dbMap.set(id, obj).get(id);
  }

  remove(id: string) {
    this.dbMap.delete(id);
  }
}
