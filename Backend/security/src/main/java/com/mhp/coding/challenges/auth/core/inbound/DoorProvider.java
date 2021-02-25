package com.mhp.coding.challenges.auth.core.inbound;

import com.mhp.coding.challenges.auth.core.entities.Door;

import java.util.List;

public interface DoorProvider {

    List<Door> triggerDoorListing();

    Door triggerDoorStateChange(Door door);

}
