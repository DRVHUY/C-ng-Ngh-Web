import * as sql from 'mssql';
export declare let pool: sql.ConnectionPool;
export declare function connectDatabase(): Promise<void>;
export declare function closeDatabase(): Promise<void>;
export declare function getPool(): sql.ConnectionPool;
//# sourceMappingURL=database.d.ts.map