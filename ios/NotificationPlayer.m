//
//  NotificationPlayer.m
//  Toothie
//
//  Created by Mikko Harju on 26/03/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "NotificationPlayer.h"

#import <AudioToolbox/AudioToolbox.h>
#import <AVFoundation/AVFoundation.h>

@interface NotificationPlayer () {
  SystemSoundID notificationSoundId;
}
@end

@implementation NotificationPlayer

- (id) init
{
  if(self = [super init]) {
    NSError *error;
    [[AVAudioSession sharedInstance] setMode:AVAudioSessionModeDefault error:&error];
    if(error != nil) {
      NSLog(@"Failed to set audio session mode: %@", error.description);
    }
    
    NSURL *path = [[NSBundle mainBundle] URLForResource:@"change" withExtension:@"wav"];
    AudioServicesCreateSystemSoundID((__bridge CFURLRef)path, &notificationSoundId);
  }
  return self;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(playNotificationSound)
{
  AudioServicesPlayAlertSound(notificationSoundId);
}
@end
