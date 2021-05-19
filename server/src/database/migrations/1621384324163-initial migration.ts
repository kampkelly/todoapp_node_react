import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1621384324163 implements MigrationInterface {
    name = 'initialMigration1621384324163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "todo_status_enum" AS ENUM('pending', 'completed')`);
        await queryRunner.query(`CREATE TABLE "todo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "status" "todo_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "subtask_status_enum" AS ENUM('pending', 'completed')`);
        await queryRunner.query(`CREATE TABLE "subtask" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "status" "subtask_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "todoId" uuid, CONSTRAINT "PK_e0cda44ad38dba885bd8ab1afd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subtask" ADD CONSTRAINT "FK_c18d34a989b753de67e6edbb855" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subtask" DROP CONSTRAINT "FK_c18d34a989b753de67e6edbb855"`);
        await queryRunner.query(`DROP TABLE "subtask"`);
        await queryRunner.query(`DROP TYPE "subtask_status_enum"`);
        await queryRunner.query(`DROP TABLE "todo"`);
        await queryRunner.query(`DROP TYPE "todo_status_enum"`);
    }

}
