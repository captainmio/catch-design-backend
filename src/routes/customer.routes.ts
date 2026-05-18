import { Router } from "express";
import { CustomerController } from "../controllers/customer.controller";

const router = Router();

router.get("/", CustomerController.getAll);
router.get("/search", CustomerController.search);
router.get("/:id", CustomerController.getById);

export default router;