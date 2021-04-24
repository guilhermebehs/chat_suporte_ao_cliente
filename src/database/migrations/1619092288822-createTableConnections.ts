import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableConnections1619092288822 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'connections',
        columns: [
          {
            name: 'uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'admin_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'user_uuid',
            type: 'uuid',
          },
          {
            name: 'socket_id',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_connection_user',
            columnNames: ['user_uuid'],
            referencedTableName: 'users',
            referencedColumnNames: ['uuid'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('connections');
  }
}
