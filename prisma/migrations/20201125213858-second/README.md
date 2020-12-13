# Migration `20201125213858-second`

This migration has been generated by adowning at 11/25/2020, 3:38:58 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TYPE "OrderType" ADD VALUE 'VOIDED'
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201125203305-first..20201125213858-second
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -37,8 +37,9 @@
 enum OrderType {
   ESTIMATE
   INVOICE
+  VOIDED
   WORKORER
 }
 model Workorder {
```

