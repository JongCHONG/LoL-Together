import { Request, Response } from "express";
import { AnnounceService } from "../services/announceService";

export const createAnnounce = async (req: Request, res: Response) => {
  try {
    const announce = await AnnounceService.createAnnounce(req.body);
    res.status(201).json(announce);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAnnounceById = async (req: Request, res: Response) => {
  try {
    const announce = await AnnounceService.getAnnounceById(req.params.id);
    if (!announce) {
      return res.status(404).json({ message: "Announce not found" });
    }
    res.status(200).json(announce);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllAnnounces = async (req: Request, res: Response) => {
  try {
    const announces = await AnnounceService.getAllAnnounces();
    res.status(200).json(announces);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateAnnounce = async (req: Request, res: Response) => {
  try {
    const announce = await AnnounceService.updateAnnounce(
      req.params.id,
      req.body
    );
    if (!announce) {
      return res.status(404).json({ message: "Announce not found" });
    }
    res.status(200).json(announce);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAnnounce = async (req: Request, res: Response) => {
  try {
    const announce = await AnnounceService.deleteAnnounce(req.params.id);
    if (!announce) {
      return res.status(404).json({ message: "Announce not found" });
    }
    res.status(200).json({ message: "Announce deleted" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
