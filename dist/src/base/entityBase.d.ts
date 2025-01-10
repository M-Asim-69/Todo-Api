declare class EntityBase {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    entitySnapshot?: any;
    loadSnapshotForPartialUpdate?(): void;
    getPropertiesToUpdate?(): {};
    constructor(entityBase?: Partial<EntityBase>);
}
export { EntityBase };
