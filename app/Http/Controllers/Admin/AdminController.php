<?php



class AdminController extends Controller {
  public function PanelIndex() {
      if (!Auth::user()->isStaff()) {
          abort(403);
      }
  }
}
